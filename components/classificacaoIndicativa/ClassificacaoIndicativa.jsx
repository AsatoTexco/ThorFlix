'client side'
import React from 'react'
import './ClassificacaoIndicativa.css'

function ClassificacaoIndicativa({children}) {
      
    if(!children || children == undefined){
        return <>
            <div className="areaClassificacao classNotFind"> 
                <h1>{":("}</h1>
                <div className="corner-1"></div>
                <div className="corner-2"></div>
            </div> 
        </>
    }

    return (
        <>
            <div className={"areaClassificacao class" + children}> 
                {children}
                <div className="corner-1"></div>
                <div className="corner-2"></div>
            </div>
        
        </>
    )
}

export default ClassificacaoIndicativa