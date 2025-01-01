'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import './FilmesFilter.css'
import Link from 'next/link'
import Image from 'next/image'
import StarsIndicacao from '@components/starsIndicacao/StarsIndicacao'
function FilmesFilter(props) {

    useEffect(() => {
        console.log(props.data)
         
    },[props])
    
    if(props.data == 0 || props.data == undefined){
        return (<div className='area_filmes_filtrados'>
                        NÃO HÁ NADA POR AQUI
                </div>)
    }
     
    return (
        <div className='area_filmes_filtrados'>
                {props.data && props.data.map((e, index) => (
                    <Link key={index} className='card_filme' href={"/filmes/"+e.id}>

                        <div className="contentCard">
                            <Image width={500} height={500} src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt={e.title} />
                         </div>

                        <h3>{e.title}</h3>
                        <StarsIndicacao numStars={e.vote_average}/>
                        
                    </Link>
                ))}
        </div>
    )
}

export default FilmesFilter
