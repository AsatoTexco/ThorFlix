import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request,{params}) {
  try {

    const id = params.id 
    const MOVIE_API = process.env.MOVIE_API


    let req = await fetch("https://api.themoviedb.org/3/movie/" + id + "/similar?language=pt-BR", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + MOVIE_API,
            'Accept': 'application/json'
        }
    }); 
    let res = await req.json()
 
      return NextResponse.json({ status:true, result:res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}