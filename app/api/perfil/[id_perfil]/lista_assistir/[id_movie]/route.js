import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
    

export async function GET(request,{params}) {
  try {  
    const id_perfil = params.id_perfil
    const id_movie = params.id_movie 
    var allow = false
    const result = await sql.query("SELECT * FROM lista_assistir WHERE id_perfil = $1 AND id_movie = $2",[id_perfil, id_movie]) 

    if(result.rowCount > 0){ 

        const r = await sql.query("SELECT * FROM perfis INNER JOIN allowed_users ON perfis.id_usuario = allowed_users.allowed_user_id  WHERE perfis.id = $1;", [parseInt(id_perfil)])
  
        allow = r.rowCount > 0 

        return NextResponse.json({   status:true,result: result.rows[0], allowedUser: allow }, { status: 200 });  
    } 
    return NextResponse.json({   status:false,result:[], allowedUser: allow }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(request,{params}) {
  try {  
    const id_perfil = params.id_perfil
    const id_movie = params.id_movie 

    const result =  await sql.query("UPDATE lista_assistir SET viewed = 1 WHERE id_perfil = $1 AND id_movie = $2 RETURNING * ", [id_perfil, id_movie])
  
    return NextResponse.json({   status:true,result:result.rows[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message:error,status:false }, { status: 500 });
  }
}