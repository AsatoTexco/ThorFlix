import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server' 
import {  decodeJwt } from 'jose';     
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import { withAuth } from "next-auth/middleware"
import { decode } from 'next-auth/jwt';

 






function getCookieValue(cookieString, cookieName) {
  // string de cookies para um array de cookies
  var cookies = cookieString.split(';');


  for(var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();

      // se o cookie começa com o nome do cookie desejado
      if(cookie.indexOf(cookieName + '=') === 0) {
          // Retorna o valor do cookie
          return cookie.substring(cookieName.length + 1);
      }
  }

  // se o cookie não for encontrado
  return null;
}





// MIDDLEWARE VALIDAR LOGIN  
export async function middleware(request: NextRequest) {
  
  
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get('cookie'),
    },
  };  
  let cookiesSt = getCookieValue(requestForNextAuth.headers.cookie,"next-auth.session-token") 
  const tokenFacebook = cookiesSt == null ? getCookieValue(requestForNextAuth.headers.cookie,"__Secure-next-auth.session-token") : cookiesSt
  if(tokenFacebook == null){

    var cookie_token = request.cookies.get("token") 
    var token = ''   
    if(typeof cookie_token != "undefined"){
      token = cookie_token.value 
      if(!decodeJwt(token)['id']){
        return NextResponse.redirect(new URL('/login', request.url)); 
      } 
      // LOGADO 
    } else{
      return NextResponse.redirect(new URL('/login', request.url)); 
    }

  }




  
}

// PATHS 
export const config = {
  matcher: ['/home','/minha-conta','/perfis','/filmes',"/filmes/:path*","/para_assistir","/assistidos"],
}