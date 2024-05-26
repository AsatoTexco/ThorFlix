import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 

export async function POST(request) {
  try { 
    const body = await request.json()
    
    const { nome,email,senha,data_nascimento } = body
    
    const result = await sql.query(`SELECT * FROM usuarios WHERE email = $1 `,[email]);

    if(result.rowCount > 0){
        return NextResponse.json({status:false, message:"Já tem um usuário com esse E-mail" }, { status: 200 });
    } 

    const req = await sql.query("INSERT INTO usuarios (nome, email, senha, data_nascimento) VALUES ($1, $2, $3, $4)  RETURNING * ",[nome,email,senha,data_nascimento])


    const imgs = ["https://images.pexels.com/photos/5023686/pexels-photo-5023686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                      "https://images.pexels.com/photos/5023690/pexels-photo-5023690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                      "https://images.pexels.com/photos/20278576/pexels-photo-20278576/free-photo-of-arte-sombrio-escuro-vintage.jpeg?auto=compress&cs=tinysrgb&w=600",
                      "https://images.pexels.com/photos/35797/carnival-mask-costume-panel.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                      "https://static-00.iconduck.com/assets.00/thor-hammer-icon-512x512-m5xfr3pr.png",
                      "https://t3.ftcdn.net/jpg/04/43/27/44/360_F_443274438_O9ZIrQ7mjiOh4vKV6hPmPwrwRsBNMJzq.jpg"]

    var indiceAleatorio = Math.floor(Math.random() * imgs.length); 
    let id_new_user = req.rows[0].id

    const insertPerfil = await  sql.query("INSERT INTO perfis (nome, id_usuario, image) VALUES ($1, $2, $3) RETURNING * ",["Principal",id_new_user,imgs[indiceAleatorio]])
     
    return NextResponse.json({status:true,perfil: insertPerfil.rows[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}