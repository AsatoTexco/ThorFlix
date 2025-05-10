'use client'
import React, { useEffect } from 'react'
import './cadastrar.css' 

import ModalConfirmEmail from '@components/modalConfirmEmail/ModalConfirmEmail'

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
    
  const [modalActiveConfEmail, setModalActiveConfEmail] = useState(false)
  const [emailModal, setEmailModal] = useState("")
  const [loading, setLoad] = useState(true)
 
  const router = useRouter() 
  const session = useSession()
   
  // deslogar
  Cookies.remove("token")  

  const handleFacebookCad = async (event) => {  
    await signIn('facebook')  
  }
  var   intervalVerifyEmail;
  const handleSubmit = async (event) => {  
    if(modalActiveConfEmail){
      return
    }
    if(email.trim().length == 0){
      alert("Preencha Todos os campos!")
    }
    setModalActiveConfEmail(true)
    setEmailModal(email)
    
    setTimeout(async () => {
      try{

        var req = await fetch("/api/user/verify_email",{
          method: "POST",
          body: JSON.stringify({ 
              email:email,  
          })
        })
        var res = await req.json() 
          
        intervalVerifyEmail = setInterval(async () => { 
          var requestEmail = await fetch("/api/user/checkconfirmEmail",{
            method: "POST",
            body: JSON.stringify({ 
                creation_id: res.creation_id,  
            })
          })
          var resEmail = await requestEmail.json() 
          if(resEmail.status){
            setModalActiveConfEmail(false)
            clearInterval(intervalVerifyEmail)
            router.push(`cadastrar/completesignup?creation_id=${res.creation_id}`)
          } 
        },3000)
      

      }catch(error){ 
        console.log("error:",error) 
      }

    },0)
 
  }
 
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

          // router.push("/perfis")  
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

  if(loading){
    return null
  } 
  const newLocal = 'btn_login_facebook'
  return (
    <div className='area_login'>
      <form action={handleSubmit} className='card_login'>
        <h1>Nova Conta</h1>
        <div className='area_inputs'>
             {/*<input type='text' value={nome} onChange={(e) => {setNome(e.target.value)}} placeholder='Nome' className='input_txt'/> */ }
            <input type='email' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='E-Mail' className='input_txt'/> 

            {/*<input type='date' value={data} onChange={(e) => {setData(e.target.value)}} placeholder='Data de nascimento' className='input_txt'/> */ }
            {/*<input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' className='input_txt'/>*/ }
        </div> 
        <div className='area_btns'>
          {/* <button type='reset' className={newLocal} onClick={handleFacebookCad}><FontAwesomeIcon icon="fa-brands fa-facebook" /></button> */}
          <input className='btn_entrar' type='submit' value={"Continuar"} />  
          <Link href={"/login"}>Entrar</Link>
        </div>
          
      </form> 
      <ModalConfirmEmail active={modalActiveConfEmail} email={emailModal}/>
    </div>
  )
}

export default Page
library.add(far,fas,fab)