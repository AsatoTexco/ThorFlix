import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server' 
import {  decodeJwt } from 'jose';    

import { getCsrfToken } from 'next-auth/react';
 
 
// MIDDLEWARE VALIDAR LOGIN  
export async function middleware(request: NextRequest) {
  
  const csrfToken = await getCsrfToken()
  
 
}

// PATHS 
export const config = {
  matcher: ['/home','/minha-conta','/perfis','/filmes',"/filmes/:path*","/para_assistir","/assistidos"],
}