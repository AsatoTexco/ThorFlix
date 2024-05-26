'use client'

import React from 'react'
import Menu from "../../components/menu/Menu"
import './perfis.css'

  

import { library } from '@fortawesome/fontawesome-svg-core' 
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookies from 'js-cookie'
import CardsPerfis from "../../components/cardsPerfis/CardsPerfis"

 
function page() {
    // SE PA ESSA PAGINA TEM QUE RESETAR O COOKIE QUE DEFINE QUAL PERFIL VC ESTA UTILIZANDO
   
  Cookies.set("perfil","2")


  return (
    <div className='bg-default'>
      <Menu/>
      <div className='perfis_page'>
          <h1 className='title'>Escolha seu Perfil para Continuar ⚔</h1> 
          <CardsPerfis/>
      </div>
    </div>
  )
}
 
export default page
library.add(fab,far,fas)