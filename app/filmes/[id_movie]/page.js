'use client' 
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Menu from "../../../components/menu/Menu"
import './about_filme.css' 
import { decodeJwt } from "jose"

import { library } from '@fortawesome/fontawesome-svg-core' 
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CardFilmeHome from '../../../components/cardFilmeHome/CardFilmeHome';
import StarsIndicacao from '../../../components/starsIndicacao/StarsIndicacao'
import Image from 'next/image';
import CustomCarousel from '@components/carousel/customCarousel/CustomCarousel'
import PersonElenco from "@components/personElenco/PersonElenco"
import ClassificacaoIndicativa from "@components/classificacaoIndicativa/ClassificacaoIndicativa"

import LinkEmb from "@components/linkEmb/LinkEmb"

import { useSession } from 'next-auth/react';
import LoadingCircles from '@components/loading/loadingCircles/LoadingCircles';
import { useRouter } from 'next/navigation';

function Page({params}) {

  const [load, setLoad] = useState(false)
  const [trailer, setTrailer] = useState('')
  const [assistirDps, setAssistirDps] = useState(false)
  const [similar, setSimilar] = useState(false)
  const [filmeEncontrado, setFilmeEncontrado] = useState(true)
  const [allowedUser, setAllowedUser] = useState(false)
 
  const session = useSession()
  const router = useRouter() 

  const id_movie = params.id_movie 
  
   
  const handleSalvarAssistir = async (genres,id_movie) => {
 
    var idP 
    var cookiePerfil = Cookies.get("perfil")
    if(cookiePerfil != undefined){
        idP = JSON.parse(cookiePerfil).id
    }else{
        router.push('/perfis')
        return
    }
      
    var emailV = ""
    if(session.data == null){ 
        emailV = decodeJwt(Cookies.get("token")).email  
    }else{ 
        emailV = session.data.user.email
    } 

    let req = await fetch("/api/user/"+emailV+"/assistir",{
        method:"POST",
        body:JSON.stringify({
            id_movie:id_movie,id_perfil:idP,genres:genres
        })
    })
    let res = await req.json()
     
    if(res.status){
        setAssistirDps(true)
    }

  }
  useEffect(() => {  
 

    var cookiePerfil = Cookies.get("perfil")
    if(cookiePerfil == undefined){
      router.push('/perfis')
      return
    }

    const handleFetchData = async () => {

        let req = await fetch("/api/movies/"+id_movie)
        let res = await req.json() 
        if(res.status){  
            setLoad(res.result)  
            setTrailer(res.result.videos?.results[0]?.key)
        } else{
            setFilmeEncontrado(false)
        }
    }
    
    const handleFetchDataPerfil = async () => {

        var idP 
        if(typeof  Cookies.get("perfil") != "undefined"){
            idP = JSON.parse(Cookies.get("perfil")).id
        }else{
            return
        }

        let req = await fetch("/api/perfil/"+idP+"/lista_assistir/"+id_movie)
        let res = await req.json()  
        setAllowedUser(res.allowedUser)
        if(res.status){  
            setAssistirDps(true)    
        } 
    }
    const handleFetchSimilar = async () => {
 
        let req = await fetch("/api/movies/"+id_movie+"/similar")
        let res = await req.json() 
        if(res.status){ 
            setSimilar(res.result.results) 
        } 
    }

    handleFetchDataPerfil()
    handleFetchData()
    handleFetchSimilar()
     
  },[id_movie,router])

  if(!load){
    if(!filmeEncontrado){
        return <div className='bg-default'> 
                <Menu />
                <div className='about_filme_page'>
                    <div className='content_filme_about'>  
                        Filme não encontrado
                    </div>
                </div>
            </div>
    } 
    return <div className='bg-default'> 
                <Menu />
                <div className='about_filme_page'>
                    <div className='content_filme_about'>  
                        <LoadingCircles/>
                    </div>
                </div>
            </div>
  }
  return (
    <div className='bg-default'> 
      <Menu />
      <div className='about_filme_page'>
        <div className='content_filme_about'> 
            <Image alt='imagem representativa' width={1000} height={500} className='img_background' src={"https://image.tmdb.org/t/p/original"+( load.belongs_to_collection == null ? load.backdrop_path : load.belongs_to_collection.backdrop_path == null ? load.backdrop_path : load.belongs_to_collection.backdrop_path ) }/>

            <Image alt='imagem representativa' width={400} height={400} className='img_icon_logo' src={"https://image.tmdb.org/t/p/original"+( load.backdrop_path == null ? load.belongs_to_collection == null ? load.backdrop_path :  load.belongs_to_collection.backdrop_path == null ? load.backdrop_path : load.belongs_to_collection.backdrop_path : load.backdrop_path )}/>

            <div className='about_session'>

                <h1 className='title_movie'>{load.title}</h1>
                <div className='areaYearClassificacaoIndicativa'>
                    <p className='dataMovie'>{load.release_date.slice(0,4)}</p>
                    <ClassificacaoIndicativa> 
                        {load.release_dates.results.find(x => x.iso_3166_1 == "BR")?.release_dates[0].certification}
                    </ClassificacaoIndicativa>

                </div>

                <StarsIndicacao numStars={load.vote_average} /> 

                {allowedUser &&  <LinkEmb idMovie={id_movie} /> }

                <h2 className='sobre_movie'>{load.overview}</h2>
                 
                <div className='genres'>
                    {load.genres && load.genres.map((e,index) => ( 
                        <p key={index}>{e.name}</p> 
                    ))} 
                </div>

                {assistirDps && assistirDps == true ? 
                
                <button className='btn_mc_assistir' disabled={assistirDps}>Já Adicionado <FontAwesomeIcon icon="fa-solid fa-check" /></button>
                
                : 

                <button className='btn_mc_assistir' disabled={assistirDps} onClick={(e)=> { 
                    setAssistirDps(true)
                    var listaGenres = ((load.genres).map(e => {return e.id})).join(",")
                   
                    var id_movie = load.id 
                    handleSalvarAssistir(listaGenres,id_movie)
  
                }}> Assistir mais Tarde <FontAwesomeIcon icon="fa-solid fa-plus"/></button>

              } 
            </div>

            <CustomCarousel > 
                {load.credits.cast[0] && load.credits.cast.map((e,idx) => ( 
                    <PersonElenco key={idx} data={e}/> 
                ))}  
            </CustomCarousel>

            <iframe className='trailerYT' src={"https://www.youtube.com/embed/"+trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            
            <h1 className='txt_similar'>Você também pode gostar...  </h1>
             <CustomCarousel>
                {similar && similar.map((e, index) => ( 
                    <CardFilmeHome data_filme={e} key={index} /> 
                ))}
              </CustomCarousel>
                    
            


            
        </div>
      </div>
    </div>
  )
}		 
 




export default Page
library.add(far,fas,fab)