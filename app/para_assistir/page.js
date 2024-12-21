'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Menu from "../../components/menu/Menu"
import './para_assistir.css'
import {decodeJwt} from 'jose';
import Link from 'next/link';
import Image from 'next/image';

function Page() {

  const router = useRouter() 
  const session = useSession() 
  const [data, setData] = useState(false)
  const [perfilMovies, setPerfilMovies] = useState(true)
  
   
  const handleSetViewedMoviel = async (e,idMovie) => {
    
      var IdP 
      if(typeof Cookies.get("perfil") != undefined){
        IdP = JSON.parse(Cookies.get("perfil")).id
      }
  
      let req = await fetch("/api/perfil/"+IdP+"/lista_assistir/"+idMovie,{
        method:"PUT"
      })
      let res = await req.json() 
      if(res.status){ 
        var dataF = data.filter(e => e.id != res.result.id_movie)
        setData(dataF)  

        if(dataF.length == 0){
          setPerfilMovies(false)
        }

      }
  }
  
  useEffect(() => {
    
    const handlerFetchMovies = async (id_P) => {

      let req = await fetch("/api/perfil/"+id_P+"/lista_assistir?viewed=0")
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
    
    if(typeof Cookies.get("perfil") != undefined){
      let id_perfil = JSON.parse(Cookies.get("perfil")).id
      handlerFetchMovies(id_perfil) 
    }

    const fetchMovieData  = async (id) => {
        let req = await fetch("/api/movies/"+id)
        let res = await req.json()
        return res.result
    }

     
  },[])

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
              <h1 className='title_page'>Loading...</h1>
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
            <h1 className='title_page'>Filmes para Assistir</h1>
            <div className='area_cards'>
                {data && data.map((e,key) => (
                    <div key={key} className='card_assistir'>
                        <Image alt='imagem representativa' width={800} height={800} src={'https://image.tmdb.org/t/p/original/'+e.backdrop_path}/>
                        <div className='overlay_card'>
                            <p>{e.title}</p>
                            <Link href={"/filmes/"+e.id}>Ver Detalhes</Link>
                            <button onClick={(ev) => {handleSetViewedMoviel(ev,e.id)}}>Ja assisti</button>
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
