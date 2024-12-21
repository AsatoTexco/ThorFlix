'use client'
import React, { useEffect, useState } from 'react'
import Menu from "../../components/menu/Menu"
import './minha_conta.css'
import { signOut, useSession } from 'next-auth/react'
import Cookies from 'js-cookie'
import {  decodeJwt } from 'jose';  
import { useRouter } from 'next/navigation'
import { library } from '@fortawesome/fontawesome-svg-core' 
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'


function Page() {

  const session = useSession()
  const router = useRouter()

  const [name,setName] = useState("")
  const [img,setImg] = useState("")
  const [email,setEmail] = useState("") 
  
  const [facebookAuth, setFace] = useState(true)
    
  useEffect(() => { 
    if(session.data == null){ 
        if(typeof Cookies.get("token") == "undefined"){
          router.push("/login")
        }

      let token = Cookies.get("token")
      const dataDecode = decodeJwt(token) 
      setName(dataDecode.name)
      setEmail(dataDecode.email) 
 
    }else{   
      const dataDecode = session.data.user 
      setName(dataDecode.name)
      setEmail(dataDecode.email)
      setImg(dataDecode.image)
      setFace(false)
      
    }

  },[session,router])


  return (
    <div className='bg-default'>
      <Menu/>
      <div className='minha_conta'>

        <div className='area_about'>
            <div className='area_img'>
                <Image alt='imagem representativa' height={200} width={200} className='img_profile' src={ session.data!=null ? session.data.user.image : "https://static-00.iconduck.com/assets.00/thor-hammer-icon-512x512-m5xfr3pr.png" } />
            </div>
            <h1>{name}</h1>
            <h2>{email }</h2>
             { !facebookAuth && <h3><FontAwesomeIcon icon="fa-brands fa-facebook" /> Facebook Auth</h3> } 
            <button onClick={(e) => {
              if(session.data != null){   
                signOut() 
              }
              router.push("/login") 
            }} className='btn_sair_about'>Sair</button>
        </div>

      </div>
    </div>
  )
}

export default Page
library.add(fab,far,fas)