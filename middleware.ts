import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server' 
import {  decodeJwt } from 'jose';     

 
// MIDDLEWARE VALIDAR LOGIN  
export async function middleware(request: NextRequest) {
  
  console.log("2")
  // var cookie_token = request.cookies.get("token") 
  // var token = ''   

  // if(typeof cookie_token != "undefined"){
  //   token = cookie_token.value 
  //   if(!decodeJwt(token)['id']){
  //     return NextResponse.redirect(new URL('/login', request.url)); 
  //   } 
  //   // LOGADO 
  // } else{
  //   return NextResponse.redirect(new URL('/login', request.url)); 
  // }
}

// PATHS 
export const config = {
  matcher: ['/home','/minha-conta','/perfis','/filmes',"/filmes/:path*","/para_assistir","/assistidos"],
}