'use client'
import React, { useEffect } from 'react'
import './login.css'

import { library } from '@fortawesome/fontawesome-svg-core' 
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'




function Page() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter() 
  const [loading, setLoad] = useState(true)
  
  // deslogar
  Cookies.remove("token") 
  const session = useSession()
   
  
  useEffect(() => {

    const handleValidLogin = async () => {
      const s = session
      if(s.status == "authenticated"){  
        let email = s.data.user.email
        let nome = s.data.user.name
        let req = await fetch("/api/user/cad_face",{
          method:"POST",
          body:JSON.stringify({email:email,nome:nome})
        })
        let res = await req.json()
         
        if(res.status){
          router.push("/perfis")  
        }else{
          signOut()
          setLoad(false)
        }
      } else{
        setLoad(false)
      } 
    }
    handleValidLogin()

  },[router,session])
   
  const handleFacebookLogin = async (event) => {  
    await signIn('facebook')   
  } 
 
  const handleSubmit = async (event) => {  
     
    let req = await fetch("/api/user/login",{
      method:"POST",
      body:JSON.stringify({
        email:email,password:password
      })
    })
    let res = await req.json()  
 
    
    if(res.status){ 
      const urlC = Cookies.get('urlCallback')

      Cookies.set("token",res.token) 
      if(urlC != undefined){
        Cookies.remove("urlCallback", { path: "/" }); 
        router.replace(urlC)
 
      }else{ 
        router.push("/perfis") 
      }

    }else{
      alert("Credenciais Inválidas")
    } 

  }

  if(loading){
    return null
  }

  return (
    <div className='area_login'>
      <form action={handleSubmit} className='card_login'>
        <h1>Login</h1>
        <div className='area_inputs'>
            <input type='email' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='E-Mail' className='input_txt' id='email_input'/> 
            <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' className='input_txt' id='pass_input'/> 
        </div> 
        <div className='area_btns'>
          <button type='reset' className='btn_login_facebook' onClick={handleFacebookLogin}><FontAwesomeIcon icon="fa-brands fa-facebook" /></button>
          <input className='btn_entrar' type='submit' value={"Entrar"} />  
          <Link href={"/cadastrar"}>Criar Conta</Link>
        </div>
          
      </form>
      
    </div>
  )
}

export default Page
library.add(far,fas,fab)