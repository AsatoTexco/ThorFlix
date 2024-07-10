import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request,{params}) {
  try {

    const id = params.id 
    const MOVIE_API = process.env.MOVIE_API


    let req = await fetch("https://api.themoviedb.org/3/movie/" + id + "?language=pt-BR", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + MOVIE_API,
            'Accept': 'application/json'
        }
    }); 
    let res = await req.json()
    
    let r = await fetch("https://api.themoviedb.org/3/movie/" + id + "/videos?language=pt-BR", {
      method: "GET",
      headers: {
          'Authorization': 'Bearer ' + MOVIE_API,
          'Accept': 'application/json'
      }
    })
    let s = await r.json()
    var trailer = false
    if(s.results.length > 0){
        s.results.forEach(element => {
            trailer = element.type == "Trailer" ? element.key : false 
        });
    } 
     
    
 
      return NextResponse.json({ status:true, result:res, trailer:trailer }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}