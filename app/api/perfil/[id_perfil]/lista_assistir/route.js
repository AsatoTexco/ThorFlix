import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
    

export async function GET(request,{params}) {
  try {  
    const url = new URL(request.url);
    var viewed = url.searchParams.get('viewed');
    const {id_perfil} = await params

    var result

    if(viewed == null){
       
      result = await sql.query("SELECT * FROM lista_assistir WHERE id_perfil = $1 ",[id_perfil]) 
      
    }else{
      result = await sql.query("SELECT * FROM lista_assistir WHERE id_perfil = $1 AND viewed = $2 ORDER BY id DESC",[id_perfil,viewed]) 
    }
      
    if(result.rowCount > 0){
      return NextResponse.json({   status:true, result:result.rows }, { status: 200 }); 
    }
    
    return NextResponse.json({   status:false,result:[] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });   
  }
}