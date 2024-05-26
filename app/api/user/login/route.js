import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken"

export async function POST(request) {
  try {

    const body = await request.json()
    const {email, senha} = body
    if(!email || !senha){
      return NextResponse.json({ status:false,message:"Insira todos os dados" }, { status: 500 });
    }

    if(senha.length == 0){ 
      return NextResponse.json({ status:false,message:"Insira todos os dados" }, { status: 500 });
    }
    const JWT_WEB_TOKEN = process.env.JWT_WEB_TOKEN

 
    const result =
      await sql.query(`SELECT * FROM usuarios WHERE email = $1 AND senha = $2`,[email,senha]);

    if(result.rowCount == 0){
        return NextResponse.json({status:false }, { status: 500 });
    } 
    const token = jwt.sign(result.rows[0],JWT_WEB_TOKEN)
    
    // token composição:
    // {
    //     "token": {
    //         "id": 1,
    //         "email": "adm@gmail.com",
    //         "senha": "123",
    //         "nome": "João Silva",
    //         "data_nascimento": "1990-01-01T02:00:00.000Z",
    //         "iat": 1716467547
    //     },
    //     "status": true
    // }
    // OBS: CODIFICADO 

    return NextResponse.json({ token, status:true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}