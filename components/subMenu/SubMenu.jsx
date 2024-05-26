'use client'
import React from 'react'
import './SubMenu.css'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
function SubMenu(props) {
  const router = useRouter()
  const session = useSession()
  return (
    <div className='submenu' style={{display: props.visible ? "block" : "none" }}>
      <Link href={"/minha-conta"}>Minha Conta</Link>
      <Link href={"/perfis"}>Perfis</Link>
      <button onClick={(e) => {
          if(session.data != null){
            signOut() 
          }
          router.push("/login") 
      }}>Sair</button> 
    </div>
  )
}

export default SubMenu
