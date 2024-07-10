'use client'
import React from 'react'
import './CardFilmeHome.css'
import { useRouter } from 'next/navigation'
function CardFilmeHome(props) {
    const router = useRouter()
 
  return (
    <div className='card_filmeFy' >
        <img className='img_card_filme' src={'https://image.tmdb.org/t/p/original'+ (props.data_filme.backdrop_path != null ? props.data_filme.backdrop_path : props.data_filme.poster_path)}/> 
        <div className="overlay_card">
            <h1 className='title_filme_card'>{props.data_filme.title}</h1>
            <button className='btn_seeMore' onClick={(e) => {router.push("/filmes/"+props.data_filme.id)}}  >Ver Mais</button> 
        </div>
    </div>
  )
}

export default CardFilmeHome
