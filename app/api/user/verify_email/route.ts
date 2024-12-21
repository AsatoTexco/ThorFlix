import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import ConfirmarEmailLink from '@components/emails/confirmarEmailLink/ConfirmarEmailLink' 
 import { createHash } from 'crypto';
import templateImplement from 'utils/templateImplements';


export async function POST(request:NextRequest) {
  try { 
    const body = await request.json();
    const {email} = body

    if(!email){
      return NextResponse.json({ status: false, message: "Os seguintes campos são obrigatórios: nome e email" }, { status: 400 });
    }

    const hash = createHash('md5');
    hash.update(email+Date().toString()+process.env.TF_TOKEN_RANDOM);
    const md5 = hash.digest('hex');  
 
    // cadastrar no banco -> enviar e-mail -> retornar id unico de verificação 
    const req = await sql.query(
        `INSERT INTO token_verify (email,tf_token) VALUES ($1,$2) RETURNING *`,
        [email,md5]
    );

    
    const htmlContent = templateImplement(ConfirmarEmailLink,{ 
      link_conf_email:`${process.env.THORFLIX_HOST_URL}/account/newaccountverification?creation_id=${req.rows[0].id}&tf_token=${req.rows[0].tf_token}`
    }) 
    
    // SERA IMPLEMENTADO RabbitMQ here 
    const response = await fetch(`${process.env.THORFLIX_HOST_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        to: email,
        subject:"Verificação de e-mail de nova conta ThorFlix",
        html: htmlContent,
      })
    });



    return NextResponse.json({creation_id:req.rows[0].id})
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}