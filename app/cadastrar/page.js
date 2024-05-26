'use client'
import React, { useEffect } from 'react'
import './cadastrar.css'

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




function page() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');
  const [nome, setNome] = useState('');

  const [loading, setLoad] = useState(true)

  const router = useRouter() 
  const session = useSession()
   
  // deslogar
  Cookies.remove("token")  

  const handleFacebookCad = async (event) => {  
    await signIn('facebook')  
  }
 

  const handleSubmit = async (event) => {  

    let req = await fetch("/api/user",{
        method: "POST",
        body: JSON.stringify({
            nome:nome,
            email:email,
            senha:password,
            data_nascimento:data
        })
    })
    let res = await req.json()

    if(res.status){ 
        if(session){
            if(session.status == "authenticated"){
                signOut()
                router.push("/login")
            }
        }

        alert("Cadastrado com Sucesso!")

        router.push("/login")
    }else{
        alert(res.message)
    }


  }

  useEffect(() => {

    const handleValidLogin = async () => {
      if(session.status == "authenticated"){  
        let email = session.data.user.email
        let nome = session.data.user.name
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

  },[router])

  if(loading){
    return null
  }

  return (
    <div className='area_login'>
      <form action={handleSubmit} className='card_login'>
        <h1>Nova Conta</h1>
        <div className='area_inputs'>
            <input type='text' value={nome} onChange={(e) => {setNome(e.target.value)}} placeholder='Nome' className='input_txt'/> 

            <input type='date' value={data} onChange={(e) => {setData(e.target.value)}} placeholder='Data de nascimento' className='input_txt'/> 

            <input type='email' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='E-Mail' className='input_txt'/> 
            <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' className='input_txt'/> 
        </div> 
        <div className='area_btns'>
          <button type='reset' className='btn_login_facebook' onClick={handleFacebookCad}><FontAwesomeIcon icon="fa-brands fa-facebook" /></button>
          <input className='btn_entrar' type='submit' value={"Cadastrar"} />  
          <Link href={"/login"}>Entrar</Link>
        </div>
          
      </form> 
      
    </div>
  )
}

export default page
library.add(far,fas,fab)