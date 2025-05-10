'client side'
import React, { useEffect, useState } from 'react'  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './LinkEmb.css'
import Cookies from 'js-cookie';

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
import { decodeJwt } from 'jose';

function LinkEmb({idMovie}) {   

  const [linkUrl, setLinkUrl] = useState(false)
  const router = useRouter()
  const session = useSession()

  useEffect(() => {

    const fetchLinkPlataformaOficial = async () => { 

      var emailV = ""
      if(session.data == null){ 
          emailV = decodeJwt(Cookies.get("token")).email  
      }else{  
          emailV = session.data.user.email
      } 
        
      var cookiePerfil = Cookies.get("perfil")
      if(cookiePerfil == undefined){
        router.push(`/perfis`)
      }
      var idP = JSON.parse(cookiePerfil).id 
      
      const reqUrl = await fetch(`/api/movies/${idMovie}/links_sites_oficiais`)
      const resUrl = await reqUrl.json() 
      if(resUrl.url){
        setLinkUrl(resUrl.url)
      }
    }

    fetchLinkPlataformaOficial() 
 
  },[idMovie,router,session])
  
 
  if(!linkUrl)  return <></> 
 

  return (
    <div className='areaCLR'> 
      
      <a target='_blank' className='btnCRLF' href={ linkUrl }>
        <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" />
      </a>
    </div>
  )
}

export default LinkEmb 