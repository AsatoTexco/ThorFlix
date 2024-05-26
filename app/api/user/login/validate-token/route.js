import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken"

export async function POST(request) {
  try {

    const body = await request.json()
    const {token} = body
    const JWT_WEB_TOKEN = process.env.JWT_WEB_TOKEN

    const val = jwt.verify(token,JWT_WEB_TOKEN)
    
    if(val.id){
        return NextResponse.json({ status:true }, { status: 200 }); 
    }
     



  } catch (error) {
    return NextResponse.json({ status:false }, { status: 500 });
  }
}