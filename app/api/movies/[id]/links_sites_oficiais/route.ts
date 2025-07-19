import { sql } from '@vercel/postgres';
import { JWTPayload, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
 
export async function GET(request,{params}) {
  try { 

    
    const {id: idMovie} = await params
       
    const secret = new TextEncoder().encode(process.env.JWT_WEB_TOKEN)
    const cookie_token = request.cookies.get("token") 
    const token = cookie_token.value 
    var jwtTokenDecode:JWTPayload

    try{   
        jwtTokenDecode = (await jwtVerify(token,secret)).payload
    }catch(erroInvalidToken){
      return NextResponse.json({ message: "Token Inválido" }, { status: 500 })
    } 
 

    const allowedUserByEmail = await sql.query("SELECT * FROM users INNER JOIN allowed_users ON users.id = allowed_users.allowed_user_id WHERE users.email = $1", [jwtTokenDecode.email])

    if(allowedUserByEmail.rowCount == 0){
      return NextResponse.json({ message: "Usuário sem permissão para acessar links de sites oficias (netflix, disney etc)" }, { status: 403 });
    }

    // TODO - vincular id filme com o allowed_user_id para buscar link da netflix/disney ou algo do tipo corretamente
    const urlToOficialPage = await sql.query('select * from allowed_users order by allowed_users.id DESC limit 1'); 
    // pega o link de site mais correto para retornar para o usuário (atualmente vai para o site oficial da netflix com o id)
    if(urlToOficialPage.rowCount > 0){ 
        return NextResponse.json({ url: urlToOficialPage.rows[0].link_para_plataforma_como_netflix+idMovie }, { status: 200 });
    }
    else{
        return NextResponse.json({ url: false }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}