import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server'; 

export async function POST(request:NextRequest) {
try { 

    
    
    const body = await request.json(); 
    const {creation_id,tf_token} = body 
   
    if(!creation_id || isNaN(creation_id) || !tf_token){ 
        return NextResponse.json({ status:false, message:"creation_id ou tf_token é inexistente ou inválido" }, { status: 200 }); 
    }
    
    const select = await sql.query("SELECT * FROM token_verify WHERE id = $1 AND tf_token = $2",[creation_id, tf_token]) 

    if(select.rowCount == 0){
        return NextResponse.json({status:false, message:"Validação não encontrada" }, { status: 200 }); 
    }

    if(select.rows[0].status == true){

        return NextResponse.json({ status:false, message: "E-Mail ja verificado" }, { status: 200 });

    }
    if(select.rowCount > 0){ 
        const timeSNow = new Date().toISOString()
        const update = await sql.query("UPDATE token_verify SET status = true, confirmed_at = $1 WHERE id = $2 RETURNING *",[timeSNow,creation_id]) 
        return NextResponse.json({status:true,message:"Verificado com Sucesso!"})
    }else{
        return NextResponse.json({ status:false,message:"creation_id é um parâmetro obrigatório" }, { status: 500 }); 
    }
    
} catch (error) { 
    return NextResponse.json({ message: error.message }, { status: 500 });
}
}