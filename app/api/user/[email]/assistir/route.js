import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request,{params}) {
  try {

    const email_user = params.email
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
 
    const r = await sql.query("INSERT INTO lista_assistir (id_perfil, id_movie, genres) VALUES ($1, $2, $3) RETURNING *", [id_perfil, id_movie, genres])
 
    return NextResponse.json( {status:true,result:r.rows}, { status: 200 });
    
    
  } catch (error) {
    await sql.query('ROLLBACK');
    return NextResponse.json({ status: false, error: error.message }, { status: 500 });
  }
}
