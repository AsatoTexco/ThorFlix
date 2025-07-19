import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import ConfirmarEmailLink from '@components/emails/confirmarEmailLink/ConfirmarEmailLink' 
 import { createHash } from 'crypto';
import templateImplement from 'utils/templateImplements';
import {verifyEmailSchema, VerifyEmailSchema} from "@/infrastructure/validators/verifyEmailSchema";
import { z } from "zod/v4";
import {handlerException} from "@/infrastructure/ExceptionHandlers/handlerException";
import {tokenVerifyUseCase} from "@/config/dependencies";
import {TokenVerify} from "@/domain/entities/TokenVerify";


export async function POST(request:NextRequest) {
  try { 
    const body = await request.json();
    const validatedData: VerifyEmailSchema = verifyEmailSchema.parse(body)

    // if(!validatedData.email){
    //   return NextResponse.json({ status: false, message: "Os seguintes campos são obrigatórios: email" }, { status: 400 });
    // }

    const tokenCreated: TokenVerify = await tokenVerifyUseCase.createTokenVerifyForEmail(validatedData.email)

    //
    // const hash = createHash('md5');
    // hash.update(validatedData.email+Date().toString()+process.env.TF_TOKEN_RANDOM);
    // const md5 = hash.digest('hex');
    //
    // // cadastrar no banco -> enviar e-mail -> retornar id unico de verificação
    // const req = await sql.query(
    //     `INSERT INTO token_verify (email,tf_token) VALUES ($1,$2) RETURNING *`,
    //     [validatedData.email, md5]
    // );


    // const htmlContent = templateImplement(ConfirmarEmailLink,{
    //   link_conf_email:`${process.env.THORFLIX_HOST_URL}/account/newaccountverification?creation_id=${req.rows[0].id}&tf_token=${req.rows[0].tf_token}`
    // })

    // SERA IMPLEMENTADO RabbitMQ here
    // const response = await fetch(`${process.env.THORFLIX_HOST_URL}/api/send-email`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body:JSON.stringify({
    //     to: validatedData.email,
    //     subject:"Verificação de e-mail de nova conta ThorFlix",
    //     html: htmlContent,
    //   })
    // });

    return NextResponse.json({creation_id:tokenCreated.id})
  }catch (e){
    if(e instanceof z.ZodError){
      let errors = ""
      Object.keys(z.flattenError(e).fieldErrors).map((key) => errors+=`${z.flattenError(e).fieldErrors[key]}; `)
      return NextResponse.json({message: errors}, {status: 400})
    }
    if(e instanceof Error){
      return NextResponse.json({"message": e.message  }, {status: 500})
    }

    return handlerException(e)

  }
}