import Image from 'next/image'
import React from 'react'
import './PersonElenco.css'

function PersonElenco(props) {
    if(!props.data){
        return <h1>Teste</h1>
    }
    const d = props.data
    const imageSrc = d.profile_path != null ? `https://image.tmdb.org/t/p/original${d.profile_path}` : `https://t3.ftcdn.net/jpg/04/43/27/44/360_F_443274438_O9ZIrQ7mjiOh4vKV6hPmPwrwRsBNMJzq.jpg`
  return (
    <div className='areaPersonElenco'>
        
        <div className="areaImagemPerson">
            <Image className='imagePersonElenco' width={255} height={255} src={`${imageSrc}`} />
        </div>

        <h3>{d.name}</h3>
        <h4>{d.character}</h4> 
    </div>
  )
}

export default PersonElenco