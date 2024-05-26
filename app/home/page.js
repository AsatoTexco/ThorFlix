'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Menu from "../../components/menu/Menu"
import SectionCardsFilmes from "../../components/sectionCardsFilmes/SectionCardsFilmes"

import './home.css'
import {decodeJwt} from 'jose';

import { library } from '@fortawesome/fontawesome-svg-core' 
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




function page() {

  const router = useRouter() 
  const session = useSession()

  const [fyData, setFyData] = useState([]) 

  
  useEffect(() => {
    
    const handleFetchDataFy = async () => {
      
      
      if(typeof Cookies.get("perfil") == undefined){
        router.push("/perfis")
        return 
      }

      var id_perfil = JSON.parse(Cookies.get("perfil")).id
      let req = await fetch("/api/perfil/"+id_perfil+"/recommended")
      let res = await req.json()
      if(res.status){ 
        setFyData(res.result)
      }
    }
    handleFetchDataFy()
  },[])
  return (
    <div className='bg-default'> 
      <Menu />
      <div className='home_page'>
        <div className='content_home'> 
          <h1 className='title_secion_homeP'>For You <FontAwesomeIcon icon="fa-solid fa-star" /></h1>
           <SectionCardsFilmes data={fyData}/>   
        </div>
      </div>
    </div>
  )
}

export default page
library.add(far,fab,fas)