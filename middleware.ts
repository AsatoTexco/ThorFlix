import Cookies from 'js-cookie'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server' 
import {  decodeJwt } from 'jose';  
import { getSession } from 'next-auth/react';

  

// MIDDLEWARE VALIDAR LOGIN  
export async function middleware(request: NextRequest) {
  var cookie_token = request.cookies.get("token") 
  var token = '' 
    
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get('cookie'),
    },
  }; 
  const session = await getSession({ req:requestForNextAuth });
  
  if(typeof cookie_token != "undefined"){
    token = cookie_token.value 
    if(!decodeJwt(token)['id']){
      return NextResponse.redirect(new URL('/login', request.url)); 
    } 
    // LOGADO 
  }else{
    if(session == null){
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  

  // LOGADO FACEBOOK 
 

}
// PATHS 
export const config = {
  matcher: ['/home','/minha-conta','/perfis','/filmes',"/filmes/:path*","/para_assistir","/assistidos"],
}