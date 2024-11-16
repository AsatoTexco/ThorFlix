import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request,{params}) {
  try {

    const url = new URL(request.url);
    const queryParam = url.searchParams.get('query');
    var pageParam = url.searchParams.get('page');


    if(queryParam == null){
        return NextResponse.json({ status:false }, { status: 200 });
    }
    if(pageParam == null){
        pageParam = 1
    }


    const MOVIE_API = process.env.MOVIE_API


    let req = await fetch("https://api.themoviedb.org/3/search/movie?query=" + queryParam+"&language=pt-BR&page="+pageParam, {
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