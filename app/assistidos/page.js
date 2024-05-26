'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Menu from "../../components/menu/Menu"
import './assistidos.css'
import {decodeJwt} from 'jose';
import Link from 'next/link';

function page() {

  const router = useRouter() 
  const session = useSession()
  var id_perfil 
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
    
    if(typeof Cookies.get("perfil") != undefined){
      id_perfil = JSON.parse(Cookies.get("perfil")).id
    }

    const fetchMovieData  = async (id) => {
        let req = await fetch("/api/movies/"+id)
        let res = await req.json()
        return res.result
    }

    const handlerFetchMovies = async () => {

        let req = await fetch("/api/perfil/"+id_perfil+"/lista_assistir?viewed=1")
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
    handlerFetchMovies()
  },[id_perfil])

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
            <h1 className='title_page'>Filmes Assistidos</h1>
            <div className='area_cards'>
                {data && data.map((e,key) => (
                    <div key={key} className='card_assistir'>
                        <img src={'https://image.tmdb.org/t/p/original/'+e.backdrop_path}/>
                        <div className='overlay_card'>
                            <p>{e.title}</p>
                            <Link href={"/filmes/"+e.id} className='link_btn_card'>Ver Detalhes</Link>
                            <a href={"whatsapp://send?text=Acabei%20de%20assistir%20a%20um%20filme%20incrível!%20A%20cada%20cena,%20fui%20transportado%20para%20um%20mundo%20de%20emoções%20e%20aventuras.%20Se%20você%20ainda%20não%20viu%20*"+e.title+"*,%20está%20perdendo%20algo%20especial.%20Recomendo%20fortemente!%20Prepare-se%20para%20uma%20jornada%20inesquecível!%20🎬✨%20%23FilmeDoAno%20%23Cinema"}>Compartilhar no WhatsApp</a>

                            {/* <button onClick={(ev) => {handleSetViewedMoviel(ev,e.id)}}>Ja assisti</button> */}
                        </div>
                    </div> 
                ))}  
            

            </div>
        </div>
      </div>
    </div>
  )
}

export default page
