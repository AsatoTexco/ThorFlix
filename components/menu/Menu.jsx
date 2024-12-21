'use client'
import React, { useState } from 'react'
import './Menu.css'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import SubMenu from '../subMenu/SubMenu'
import Image from 'next/image'
function Menu() {

    const session = useSession()
    const router = useRouter()
    const [subMenuVisible, setSubMenuVisible] = useState(false)
    const [subMenuListas, setSubMenuListas] = useState(false)
    
    const handleSingOut = () => { 
        if(session.data != null){
            signOut() 
          }
          router.push("/login") 
    }
 
  return (
    <nav className='nav-bar'> 
        <div className='area_href'>
            <Link href={"/home"}>Home</Link>
            <button onClick={(e)=>{setSubMenuListas(!subMenuListas)}}>Listas</button>
            <Link href={"/filmes"}>Filmes</Link>
             

            <div className='listas_type' style={{display:subMenuListas ? "flex":"none"}}>
                <Link href={"/para_assistir"}>Para Assistir</Link>
                <Link href={"/assistidos"}>Assistidos</Link>
            </div>
        </div> 

        <div className='area_perfil_rounded'  >
            <SubMenu visible={subMenuVisible} />
            <div className='area_img_menu'> 
                <Image width={512} height={512} alt='imagem representativa' onClick={(e) => {
                    setSubMenuVisible(!subMenuVisible)
                }} src={ session.data!=null ? session.data.user.image : "https://static-00.iconduck.com/assets.00/thor-hammer-icon-512x512-m5xfr3pr.png" }/>
            </div>
        </div>
    </nav>
  )
}

export default Menu
