import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
    

export async function GET(request,{params}) {
  try {     

    const MOVIE_API = process.env.MOVIE_API
     
    const id_perfil = params.id_perfil  
    const q1 = await sql.query("SELECT * FROM lista_assistir WHERE id_perfil = $1",[id_perfil]) 
    const dataLista = q1.rows 
    const sortOb = {};
 
    dataLista.forEach((ob) => {
        const genres = ob.genres.split(",");

        genres.forEach((genre) => {
            if (sortOb[genre]) {
                sortOb[genre]++;
            } else {
                sortOb[genre] = 1;
            }
        });
    }); 

    const arrayDePares = Object.entries(sortOb);

    // Ordenar o array com base nos valores, em ordem decrescente
    arrayDePares.sort((a, b) => b[1] - a[1]);
     
    var fy = arrayDePares.slice(0,3).map(e => e[0])    
    var result 
    if(fy.length > 0){ 
        
        fy = fy.join(",")
        let req = await fetch('https://api.themoviedb.org/3/discover/movie?language=pt-BR&with_genres='+fy,{
            headers: {
                'Authorization': 'Bearer ' + MOVIE_API,
                'Accept': 'application/json'
            }
        })
        let res = await req.json()
        result = res.results
        
    }else{

        let req = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=pt-BR',{
            headers: {
                'Authorization': 'Bearer ' + MOVIE_API,
                'Accept': 'application/json'
            }
        })
        let res = await req.json();
        result = res.results
    }
 
    return NextResponse.json({   status:true,result:result}, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });   
  }
}