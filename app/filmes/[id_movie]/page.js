'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
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

function Page({params}) {

  const [load, setLoad] = useState(false)
  const [trailer, setTrailer] = useState('')
  const [assistirDps, setAssistirDps] = useState(false)
  const [similar, setSimilar] = useState(false)
  

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
          setTrailer(res.trailer) 
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
                <p className='dataMovie'>{load.release_date.slice(0,4)}</p>

                <StarsIndicacao numStars={load.vote_average} />
                

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
           
            <iframe className='trailerYT' src={"https://www.youtube.com/embed/"+trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
             
            
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

function Box({ index }) {
    return <div className="box">Box {index}</div>;
}


function CustomCarousel(props) {
    const slider = useRef(null);
    let isDown = useRef(false);
    let startX = useRef(null);
    let scrollLeft = useRef(null);
  
    useEffect(() => {
         
      if (slider && slider.current) {
        let sliderRef = slider.current;
        sliderRef.addEventListener("mousedown", one);
        sliderRef.addEventListener("mousedown", two);
        sliderRef.addEventListener("mouseleave", three);
        sliderRef.addEventListener("mouseup", four);
        sliderRef.addEventListener("mousemove", five);
  
        return () => {
          sliderRef.removeEventListener("mousedown", one);
          sliderRef.removeEventListener("mousedown", two);
          sliderRef.removeEventListener("mouseleave", three);
          sliderRef.removeEventListener("mouseup", four);
          sliderRef.removeEventListener("mousemove", five);
        };
      }
    }, []);
  
    function one(e) { 
      isDown.current = true;
      startX.current = e.pageX - slider.current.offsetLeft;
      scrollLeft.current = slider.current.scrollLeft;
    }
  
    function two(e) {
      isDown.current = true;
      startX.current = e.pageX - slider.current.offsetLeft;
      scrollLeft.current = slider.current.scrollLeft;
    }
  
    function three() {
      isDown.current = false;
    }
  
    function four() {
      isDown.current = false;
    }
  
    function five(e) {
      if (!isDown.current) return;
      e.preventDefault();
      const x = e.pageX - slider.current.offsetLeft;
      const walk = x - startX.current;
      slider.current.scrollLeft = scrollLeft.current - walk;
    }
  
    return (
      <div className="items" ref={slider}>
        {props.children}
      </div>
    );
  }


export default Page
library.add(far,fas,fab)