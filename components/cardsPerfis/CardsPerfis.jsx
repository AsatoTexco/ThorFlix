'use client'
import React, { useEffect } from 'react'
import './CardsPerfis.css'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Cookies from 'js-cookie'
import {  CompactSign, decodeJwt } from 'jose';  
import { library } from '@fortawesome/fontawesome-svg-core' 
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


function CardsPerfis() {

    const [modalVisible, setModalVisible] = useState(false)  
    const [data, setData] = useState(false)
    const [nomePerfil, setNomePerfil] = useState("")  

    const session = useSession()
    const router =  useRouter()
  
    useEffect(() => {
  
        const s = session
        var emailV = ""
        if(s.data == null){ 
            emailV = decodeJwt(Cookies.get("token")).email  
        }else{ 
            emailV = s.data.user.email
        }
        
        
        const handleQueryData = async () => {    
            let req = await fetch("/api/user/"+emailV+"/perfis")
            let res = await req.json()
            
            if(res.status){ 
                Cookies.set("perfil", JSON.stringify(res.result[0])) 
                setData(res.result)  
            } 
        }
        
        if(emailV.length > 0){

            handleQueryData()
        }
         

    },[session])

    const handleSetPerfilCookie = (perfilJson) => { 
        Cookies.set("perfil",perfilJson) 
        router.push("/home")
       
    }

    const handleSubmitModal = async (e) => { 
        var emailM = ""
        if(session.data == null){ 
            emailM = decodeJwt(Cookies.get("token")).email  
        }else{ 
            emailM = session.data.user.email
        }
         
        let req = await fetch("/api/user/"+emailM+"/perfis",{
            method:"POST",
            body:JSON.stringify({ 
                "nome":nomePerfil 
            })
        })
        let res = await req.json()
        if(res.status){
            
            setData([...data, res.result])
            setModalVisible(false)
            
        }

    }
if(!data){
    return <div className='content_cards'>
         <div className='card_add_perfil'>
         </div> 
        <div className='card_add_perfil'>
         </div> 
        <div className='card_add_perfil'>
         </div> 
        <div className='card_add_perfil'>
         </div>
    </div>
}
 
  return (
    <div className='content_cards'>
        <div className='modal_cad_perfil' style={{display: modalVisible ? "flex" :"none"}}>

                <form action={handleSubmitModal} className='content_modal_perfil'>
                    <div className='topo_modal'>
                        <button type='reset' onClick={() => {
                            setModalVisible(false)
                        }}><FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
                    </div>

                    <input className='input_nome' maxLength={12} value={nomePerfil} onChange={(e) => {
                        setNomePerfil(e.target.value)
                        
                    }} type='text' placeholder='Nome do Perfil'/> 
                    <input className='input_sub_modal' value={"Cadastrar"} type='submit' placeholder='Nome do Perfil'/> 

                </form>


        </div>
    {data && data.map((e) => (
        
        <div key={e.id} className='card_perfil' onClick={() => { 
            handleSetPerfilCookie(JSON.stringify(e))
        }}>
            <Image alt='imagem representativa' width={400} height={400} src={e.image}/>
            <h1>{e.nome}</h1> 
            <div className='hover_selection'>
                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
            </div>
        </div> 
    ))}
   
    {data.length < 4 ?
        <div className='card_add_perfil' onClick={() => {
            setModalVisible(true)
        }}>
            <FontAwesomeIcon icon="fa-solid fa-plus" />
        </div>
    
    : ""}
     
    </div>
  )
}

export default CardsPerfis
library.add(far,fab,fas)