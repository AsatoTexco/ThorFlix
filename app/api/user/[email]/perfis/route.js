import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 

export async function GET(request,{params}) {
  try {
    const email_user = params.email
    
    const findByEmail = await sql.query("SELECT * FROM usuarios WHERE email = $1",[email_user])
    
    if(findByEmail.rowCount == 0){
      return NextResponse.json({ status: false, error: "Nenhum Usuário Encontrado" }, { status: 200 });
    }

    const id_user =  findByEmail.rows[0].id
    const result = await sql.query("SELECT * FROM perfis WHERE id_usuario = $1",[id_user])
    
    
      return NextResponse.json( {status:true,result:result.rows}, { status: 200 });
    
  } catch (error) {
    await sql.query('ROLLBACK');
    return NextResponse.json({ status: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request,{params}) {
 
  try {
    const body = await request.json()

    const { nome } = body

    const email_user = params.email
      
    const findByEmail = await sql.query("SELECT * FROM usuarios WHERE email = $1",[email_user])

    const id_user =  findByEmail.rows[0].id  

    const imgs = ["https://images.pexels.com/photos/5023686/pexels-photo-5023686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                      "https://images.pexels.com/photos/5023690/pexels-photo-5023690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                      "https://images.pexels.com/photos/20278576/pexels-photo-20278576/free-photo-of-arte-sombrio-escuro-vintage.jpeg?auto=compress&cs=tinysrgb&w=600",
                      "https://images.pexels.com/photos/35797/carnival-mask-costume-panel.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                      "https://static-00.iconduck.com/assets.00/thor-hammer-icon-512x512-m5xfr3pr.png",
                      "https://t3.ftcdn.net/jpg/04/43/27/44/360_F_443274438_O9ZIrQ7mjiOh4vKV6hPmPwrwRsBNMJzq.jpg"]

    var indiceAleatorio = Math.floor(Math.random() * imgs.length); 

    const result = await sql.query("INSERT INTO perfis (nome, id_usuario, image) VALUES ($1,$2,$3)  RETURNING * ",[nome,id_user,imgs[indiceAleatorio]])

    return NextResponse.json( {status:true,result:result.rows[0]}, { status: 200 });
    
  } catch (error) {
    await sql.query('ROLLBACK');
    return NextResponse.json({ status: false, error: error.message }, { status: 500 });
  }


}