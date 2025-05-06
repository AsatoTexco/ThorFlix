'client side'
import React from 'react'
import './ClassificacaoIndicativa.css'

function ClassificacaoIndicativa({children}) {

    const colorsClass =  
    [
        "18" ,"16" ,"14" ,"12" ,"10" ,"L"   
    ] 
        
      
    if(!children || children == undefined){
        return <>
            <div className="areaClassificacao classNotFind"> 
                <h1>{":("}</h1>
                <div class="corner-1"></div>
                <div class="corner-2"></div>
            </div> 
        </>
    }

    return (
        <>
            <div className={"areaClassificacao class" + children}> 
                {children}
                <div class="corner-1"></div>
                <div class="corner-2"></div>
            </div>
        
        </>
    )
}

export default ClassificacaoIndicativa