'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Menu from "../../components/menu/Menu"
import SectionCardsFilmes from "../../components/sectionCardsFilmes/SectionCardsFilmes"

import './home.css'
 
import { library } from '@fortawesome/fontawesome-svg-core' 
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LoadingCircles from '@components/loading/loadingCircles/LoadingCircles';




function Page() {

  const router = useRouter() 
  const session = useSession()

  const [fyData, setFyData] = useState(false) 

 
  useEffect(() => {
    
    const handleFetchDataFy = async () => {
       
      if(typeof Cookies.get("perfil") == undefined){
        router.push("/perfis")
        return 
      }

      var cookiePerfil = Cookies.get("perfil")
      if(cookiePerfil == undefined){
        router.push("/perfis")
        return 
      }
      
      var id_perfil = JSON.parse(cookiePerfil).id 
      
      let req = await fetch("/api/perfil/"+id_perfil+"/recommended")
      let res = await req.json()
      if(res.status){ 
        setFyData(res.result)
      }
    }
    handleFetchDataFy()
  },[router])
  return (
    <div className='bg-default'> 
      <Menu />
      <div className='home_page'>
        <div className='content_home'> 
          <h1 className='title_secion_homeP'>For You <FontAwesomeIcon style={{height:"30px"}} icon="fa-solid fa-star" /></h1>
           <SectionCardsFilmes data={fyData}/>   
        </div>
      </div>
    </div>
  )
}

export default Page
library.add(far,fab,fas)