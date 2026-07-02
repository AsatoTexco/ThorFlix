import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server' 
import {  compactDecrypt, decodeJwt, jwtDecrypt, jwtVerify } from 'jose';     
import { getToken } from 'next-auth/jwt';


function getCookieValue(cookieString, cookieName) {
  // string de cookies para um array de cookies

  if(cookieString != null){
    var cookies = cookieString.split(';'); 
  
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
  
        // se o cookie começa com o nome do cookie desejado
        if(cookie.indexOf(cookieName + '=') === 0) {
            // Retorna o valor do cookie
            return cookie.substring(cookieName.length + 1);
        }
    } 
  }

  // se o cookie não for encontrado
  return null;
}


// MIDDLEWARE VALIDAR LOGIN  
export async function middleware(request: NextRequest) {
  
  var res: NextResponse<unknown>
  const  cookie = request.headers.get('cookie')  
  let cookiesSt = getCookieValue(cookie,"next-auth.session-token") 
  const tokenFacebook = cookiesSt == null ? getCookieValue(cookie,"__Secure-next-auth.session-token") : cookiesSt
  if(tokenFacebook == null){
    console.log("normal login")
    var cookie_token = request.cookies.get("token") 
    var token = ''   
    if(typeof cookie_token != "undefined"){
      token = cookie_token.value 
      try{ 
        if(!decodeJwt(token)['id']){
          res = NextResponse.redirect(new URL('/login', request.url)); 
        } 
      }
      catch(erro){
        res = NextResponse.redirect(new URL('/login', request.url)); 
      }
      const secret = new TextEncoder().encode(process.env.JWT_WEB_TOKEN)
      try{
        await jwtVerify(token,secret)
        console.log("token Válido") 
      }catch(erro){
        console.log('token Inválido')
        res = NextResponse.redirect(new URL('/login', request.url)); 
      }
      // LOGADO 
    } else{
      res = NextResponse.redirect(new URL('/login', request.url)); 
    }

  } else{
    console.log("Facebook login")

    try{ 
      const token2 = await getToken({
        req:request
      });
      if(token2 == null){
        console.log("Login Inválido -> Facebook")
        res = NextResponse.redirect(new URL('/login', request.url));  
      }
  
    }catch(erro){
      console.log("token invalido",erro)
    }

  }
  if(res){
    
    res.headers.set(
      "Set-Cookie",
      `urlCallback=${request.url}; Path=/; Secure; SameSite=Strict`
    );
    return res
  }
}

// PATHS 
export const config = {
  matcher: ['/home','/minha-conta','/perfis','/filmes',"/filmes/:path*","/para_assistir","/assistidos","/api/movies/:id/links_sites_oficiais"]
}