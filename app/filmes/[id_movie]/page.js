'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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


function page({params}) {

  const [load, setLoad] = useState(false)
  const [assistirDps, setAssistirDps] = useState(false)

  const router = useRouter() 
  const session = useSession()
   
  const id_movie = params.id_movie 
  
   
  const handleSalvarAssistir = async (genres,id_movie) => {

    var idP 
    if(typeof  Cookies.get("perfil") != "undefined"){
        idP = JSON.parse(Cookies.get("perfil")).id
    }else{
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
    
    const handleFetchData = async () => {

        let req = await fetch("/api/movies/"+id_movie)
        let res = await req.json()
        if(res.status){
             
            setLoad(res.result) 
        }
        // setLoad(true)
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
        if(res.status){
            setAssistirDps(true)    
        }
        

    }
    handleFetchDataPerfil()
    handleFetchData()
     
  },[])

  if(!load){
    return <div className='bg-default'> 
                <Menu />
                <div className='about_filme_page'>
                    <div className='content_filme_about'> 
                        <h1>Loading...</h1> 
                    </div>
                </div>
            </div>
  }
  return (
    <div className='bg-default'> 
      <Menu />
      <div className='about_filme_page'>
        <div className='content_filme_about'> 
            <img className='img_background' src={"https://image.tmdb.org/t/p/original"+( load.belongs_to_collection == null ? load.backdrop_path : load.belongs_to_collection.backdrop_path == null ? load.backdrop_path : load.belongs_to_collection.backdrop_path ) }/>

            {/* backdrop_path */}
            <img className='img_icon_logo' src={"https://image.tmdb.org/t/p/original"+( load.backdrop_path == null ? load.belongs_to_collection == null ? load.backdrop_path :  load.belongs_to_collection.backdrop_path == null ? load.backdrop_path : load.belongs_to_collection.backdrop_path : load.backdrop_path )}/>

            <div className='about_session'>
                <h1 className='title_movie'>{load.title}</h1>
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
                    // 12,878,28
                    var listaGenres = ((load.genres).map(e => {return e.id})).join(",")
                   
                    var id_movie = load.id
                    
                    handleSalvarAssistir(listaGenres,id_movie)
 
                    // setAssistirDps(true)
                }}  > Assistir mais Tarde <FontAwesomeIcon icon="fa-solid fa-plus"/></button>

                }
                {/* <button className='btn_mc_assistir' disabled={assistirDps}> <FontAwesomeIcon icon="fa-solid fa-plus"/>Para assistir</button> */}

             </div>

        </div>
      </div>
    </div>
  )
}

export default page
library.add(far,fas,fab)