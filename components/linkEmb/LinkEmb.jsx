'client side'
import React, { useEffect } from 'react'  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './LinkEmb.css'

function LinkEmb({idMovie}) {  

  useEffect(() => {

    console.log(idMovie)

  }, [])

  return (
    <div className='areaCLR'> 
      
      <a target='_blank' className='btnCRLF' href={ Buffer.from("aHR0cHM6Ly9lbWJlZGRlci5uZXQvZS9tb3ZpZT90bWRiPQ==", 'base64').toString('utf-8')+ +idMovie}>
        <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" />
      </a>
    </div>
  )
}

export default LinkEmb 