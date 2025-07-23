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

    const tokenCreated: TokenVerify = await tokenVerifyUseCase.createTokenVerifyForEmail(validatedData.email)

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