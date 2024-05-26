import React from 'react'
import './SectionCardsFilmes.css'
import CardFilmeHome from "../cardFilmeHome/CardFilmeHome"

function SectionCardsFilmes(props) {
  
  if(!props.data){
    return (
        <div className='area_total_cardsFilmes'>
           LOADING...
        </div>
      )
  }

  return (
    <div className='area_total_cardsFilmes'>
        {props.data && (props.data).map((e,key) => ( 
            <CardFilmeHome key={key} data_filme={e}/>
        ))}
          
    </div>
  )
}

export default SectionCardsFilmes
