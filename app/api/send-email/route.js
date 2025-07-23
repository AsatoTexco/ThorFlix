import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'



export async function POST(request) {
  try { 

    const body = await request.json();
    const { to, subject, html } = body; 

    const transporter = await nodemailer.createTransport({
        host:  process.env.GMAIL_HOST , // Servidor SMTP
        port:  process.env.GMAIL_PORT , // Porta
        secure: false, // Use 'true' para SSL
        auth: {
            user: process.env.APP_EMAIL_GMAIL,
            pass: process.env.APP_SENHA_GMAIL,
        },
    });
    try{

        const info = await transporter.sendMail({
            from: `<${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

    }catch (e){
        console.log(e)
    }
    return NextResponse.json({ info }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}