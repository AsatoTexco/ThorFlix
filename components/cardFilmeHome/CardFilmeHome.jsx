'use client'
import React, { useState } from 'react'
import './CardFilmeHome.css'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
function CardFilmeHome(props) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
 
  return (
     
    <div className='card_filmeFy' >
        <Image alt='imagem representativa' onLoad={() => {setLoading(false)}} width={loading ? 100 : 1200} height={loading ? 100 : 1200} className='img_card_filme' src={'https://image.tmdb.org/t/p/original'+ (props.data_filme.backdrop_path != null ? props.data_filme.backdrop_path : props.data_filme.poster_path)}/> 
        <div className="overlay_card">
            <h1 className='title_filme_card'>{props.data_filme.title}</h1>
            <button className='btn_seeMore' onClick={(e) => {router.push("/filmes/"+props.data_filme.id)}}  >Ver Mais</button> 
        </div>
    </div>
     
  )
}

export default CardFilmeHome
