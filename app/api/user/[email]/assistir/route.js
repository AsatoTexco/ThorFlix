import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request,{params}) {
  try {

    const {email: email_user} = await params
    const body = await request.json()

    const {id_movie, id_perfil, genres} = body 

    const findByEmail = await sql.query("SELECT * FROM users WHERE email = $1",[email_user])
    
    if(findByEmail.rowCount == 0){
      return NextResponse.json({ status: false, error: "Nenhum Usuário Encontrado" }, { status: 200 });
    }
 
    const result = await sql.query("SELECT * FROM perfis WHERE id = $1",[id_perfil])
    
    if(result.rowCount == 0){
      return NextResponse.json({ status: false, error: "Nenhum Perfil Encontrado" }, { status: 200 });
    }
    
    const checkLink = await sql.query(`
      SELECT * FROM users 
      INNER JOIN perfis
      ON users.id = perfis.id_usuario
      INNER JOIN lista_assistir
      ON lista_assistir.id_perfil = perfis.id
      WHERE users.email = $1 
      AND lista_assistir.viewed = 0
      AND lista_assistir.id_movie = $2 
      AND perfis.id = $3
    `,[email_user, id_movie, id_perfil])

    if(checkLink.rowCount > 0 ){
      return NextResponse.json({ status: false, error: "O filme já está vinculado ao perfil, tente novamente com outro" }, { status: 200 });
    }

    const r = await sql.query("INSERT INTO lista_assistir (id_perfil, id_movie, genres) VALUES ($1, $2, $3) RETURNING *", [id_perfil, id_movie, genres])
 
    return NextResponse.json( {status:true,result:r.rows}, { status: 200 });
    
    
  } catch (error) {
    await sql.query('ROLLBACK');
    return NextResponse.json({ status: false, error: error.message }, { status: 500 });
  }
}
