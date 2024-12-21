import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server'; 

export async function POST(request:NextRequest) {
try {  

    const body = await request.json();
    const {creation_id} = body 
   
    if(!creation_id || isNaN(creation_id)){ 
        return NextResponse.json({ status:false, message:"creation_id inexistente ou inválido" }, { status: 200 }); 
    }
    
    const select = await sql.query("SELECT * FROM token_verify WHERE id = $1",[creation_id]) 

    if(select.rowCount == 0){
        return NextResponse.json({status: false, message:"Não possui esse registro no banco"  }, { status: 200 }); 
    }
    
    
    return NextResponse.json({status: select.rows[0].status, message:"Registro encontrado"  }, { status: 200 }); 
    
} catch (error) { 
    return NextResponse.json({status:false, message: error.message }, { status: 500 });
}
}