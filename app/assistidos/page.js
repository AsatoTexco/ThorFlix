'use client'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Menu from "../../components/menu/Menu"
import './assistidos.css'
import Link from 'next/link';
import Image from 'next/image';
import LoadingCircles from '@components/loading/loadingCircles/LoadingCircles';
import { useRouter } from 'next/navigation';

function Page() {
  
  const [data, setData] = useState(false)
  const [perfilMovies, setPerfilMovies] = useState(true) 
  const router = useRouter()
  
 

  useEffect(() => { 

    var cookiePerfil = Cookies.get("perfil")
    if(cookiePerfil == undefined){
      router.push('/perfis')
      return
    } 
    const fetchMovieData  = async (id) => {
      let req = await fetch("/api/movies/"+id)
      let res = await req.json()
      return res.result
    }

    const handlerFetchMovies = async (id_P) => {

      let req = await fetch("/api/perfil/"+id_P+"/lista_assistir?viewed=1")
      let res = await req.json()
      if(res.status){
  
          var ids = (res.result).map(e => e.id_movie) 
          const promise = ids.map(id => fetchMovieData(id))
          const result = await Promise.all(promise)
          
          if(result.length > 0){
              setData(result)
          } 
      }else{ 
          setPerfilMovies(false)
      } 
    }   

    var cookiePerfil = Cookies.get("perfil")
        if(cookiePerfil == undefined){
          router.push('/perfis')
          return
    } 

    let id_perfil = JSON.parse(cookiePerfil).id
    handlerFetchMovies(id_perfil) 
 

  },[router])



  

  


  if(!perfilMovies){
    return (
    <div className='bg-default'> 
        <Menu />
        <div className='para_assistir_page'>
        <div className='content_para_assistir'> 
            <h1 className='title_page'>Não há nada por aqui, adicione algum filme à Lista.</h1>
        </div>
        </div>
    </div>
    )
  }
  if(data == false){
    return (
        <div className='bg-default'> 
          <Menu />
          <div className='para_assistir_page'>
            <div className='content_para_assistir'> 
              <h1 className='title_page'> <LoadingCircles/></h1>
            </div>
          </div>
        </div>
      )
  }
  
  return (
    <div className='bg-default'> 
      <Menu />
      <div className='para_assistir_page'>
        <div className='content_para_assistir'> 
            <h1 className='title_page'>Filmes Assistidos</h1>
            <div className='area_cards'>
                {data && data.map((e,key) => (
                    <div key={key} className='card_assistir'>
                        <Image alt='imagem representativa' width={800} height={800} src={'https://image.tmdb.org/t/p/original/'+e.backdrop_path}/>
                        <div className='overlay_card'>
                            <p>{e.title}</p>
                            <Link href={"/filmes/"+e.id} className='link_btn_card'>Ver Detalhes</Link>
                            <a href={"whatsapp://send?text=Acabei%20de%20assistir%20a%20um%20filme%20incrível!%20A%20cada%20cena,%20fui%20transportado%20para%20um%20mundo%20de%20emoções%20e%20aventuras.%20Se%20você%20ainda%20não%20viu%20*"+e.title+"*,%20está%20perdendo%20algo%20especial.%20Recomendo%20fortemente!%20Prepare-se%20para%20uma%20jornada%20inesquecível!%20🎬✨%20%23FilmeDoAno%20%23Cinema"}>Compartilhar no WhatsApp</a>
                        </div>
                    </div> 
                ))}  
            </div>
        </div>
      </div>
    </div>
  )
}

export default Page
