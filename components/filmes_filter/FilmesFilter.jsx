'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import './FilmesFilter.css'
import Link from 'next/link'
import Image from 'next/image'
function FilmesFilter(props) {

    useEffect(() => {
        
         
    },[props])
    
    if(props.data == 0){
        return <div className='area_filmes_filtrados'>
                        NÃO HÁ NADA POR AQUI
                </div>
    }
     
    return (
        <div className='area_filmes_filtrados'>
                {props.data && props.data.map((e, index) => (
                    <div key={index} className='card_filme'>
                        <Image width={500} height={500} src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt={e.title} />
                        <h3>{e.title}</h3>
                        <p>{(e.overview).length > 80 ? (e.overview).slice(0,80) + "..." : e.overview}</p>
                        <Link className='btn_more_about' href={"/filmes/"+e.id}>Ver mais</Link>
                    </div>
                ))}
        </div>
    )
}

export default FilmesFilter
