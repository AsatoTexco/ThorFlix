import React from 'react'
import './StarsIndicacao.css' 



import { library } from '@fortawesome/fontawesome-svg-core' 
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' 


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function StarsIndicacao(props) {
   

  if(!props.numStars){
    return (
        <div className='areaStars'>
            <FontAwesomeIcon icon="fa-solid fa-star" style={{color: "#c4c4c4",}} /> Não avaliado
        </div>
      )
  }

  const avaliacao = Math.round( (props.numStars / 2) * 10) / 10 ;
  const qntStar = parseInt(String(avaliacao).charAt(0))
  

  if(props.numStars < 1){
    return (
        <div className='areaStars'>
            <FontAwesomeIcon icon="fa-solid fa-star" style={{color: "#c4c4c4",}} /> {avaliacao}
        </div>
      )
  }



  return (
    <div className='areaStars'>
       {[...Array(qntStar)].map((_, index) => (
         <FontAwesomeIcon key={index} icon="fa-solid fa-star" style={{color: "#FFD43B",}} /> 
      ))} <label >{avaliacao}</label>
    </div>
  )
}

export default StarsIndicacao

library.add(far,fas,fab)