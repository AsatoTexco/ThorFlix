'use client'
import './completesignup.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie';

import { useState } from 'react'



 
function Page() {
 
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState(''); 
  const [nome, setNome] = useState('');


  const [typeI, setTypeI] = useState(true)
  const [typeII, setTypeII] = useState(true)
  
  const router = useRouter()
  const seachParams = useSearchParams()

  const [loadReq, setLoadReq] = useState(false)


  const awaitTeste = async () => {

    return new Promise(resolve => setTimeout( resolve,2000) )


  }

  const handleSubmit2 = (event) => { 
     
    setLoadReq(true)

    awaitTeste()

     
  }

  const handleSubmit = (event) => {   
    setLoadReq(true)  
     
    if(!checkPreenchimento(password,confPassword,nome)){
      alert("Preencha todos os campos")
      setLoadReq(false)
      return
    }

    if(!verifyPasswords(password,confPassword)){
      alert("Senhas diferentes")
      setLoadReq(false)
      return
    }
    if(!seachParams.has("creation_id")){ 
      alert("Cadastro não encontrado") 
      setLoadReq(false)
      return
    }

    // request -> [creation_id,nome,p1,p2] => /create
    cadastrarUser()
    


  }


  const cadastrarUser = async () => {

    const req = await fetch("/api/user/",{
      method:"POST",
      body: JSON.stringify({
        creation_id: seachParams.get("creation_id"),
        name: nome,
        password:password
      })
    })

    const res = await req.json()
    
    alert(res.message)
    
    if(res.status){
      Cookies.set("token",res.tokenLoginAutomatic) 
      router.push("/perfis")
    }

    setLoadReq(false)
    
    

  }


  const verifyPasswords = (password,password2) => { 
    if(password.trim() !== password2.trim()){
      return false
    }
    return true
  }
  const checkPreenchimento = (p1,p2,nome) => {

    if(p1.trim().length == 0){ 
      return false
    }
    if(p2.trim().length == 0){ 
      return false
    }
    if(nome.trim().length == 0){ 
      return false
    }

    return true
  }

 
   

 
  return (
    <div className='area_login'>
      <form action={handleSubmit} className='card_login'>
        <h1>Completar Cadastro</h1>
        <div className='area_inputs'>
            <input type='text' value={nome} onChange={(e) => {setNome(e.target.value)}} placeholder='Nome' className='input_txt'/>  
            
            <div className='areaInputPass'>
                <input type={typeII ? "password": 'text'} value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Senha' className='input_txt'/>
                <button className='hideShowbtn' type='button' onClick={() => { 
                    setTypeII(!typeII)
                }}>  <FontAwesomeIcon icon={typeII ? 'fa-solid fa-eye-slash': 'fa-solid fa-eye' } /></button>
            </div>
            <div className='areaInputPass'>
                <input type={typeI ? "password": 'text'} value={confPassword} onChange={(e) => {setConfPassword(e.target.value)}} placeholder='Confirmar Senha' className='input_txt'/>
                <button className='hideShowbtn' type='button' onClick={() => { 
                    setTypeI(!typeI)
                }}>  <FontAwesomeIcon icon={typeI ? 'fa-solid fa-eye-slash': 'fa-solid fa-eye' } /></button>
            </div>
            
        </div> 
        <div className='area_btns'>
           <input disabled={loadReq} className='btn_entrar' type='submit' value={"Continuar"} />   
         </div>
          
      </form>  
    </div>
  )
}

export default Page
library.add(far,fas,fab)