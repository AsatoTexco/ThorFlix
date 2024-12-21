'use client'
import React, { useEffect } from 'react'
import './ModalConfirmEmail.css'

function ModalConfirmEmail(props) {

     
    if(!props.active || !props.email){ 
        return 
    }

  return (

    <div className='areaModalConfirmarEmail'>
        <div className="backgroundCloseModal"></div>
        <div className='modalConfirmarEmail'>

        <div className="headConfModalM"> 
            <h2>Verifique seu Endereço de E-Mail</h2> 
        </div>

        <div className="areaLoadingAbout">
                <div className="contentAreaLoadingEmail"> 
                    <p>Você receberá uma mensagem do ThorFlix no e-mail <strong>{props.email}</strong> para concluir a configuração da sua conta.</p>
                    <div className="loadingContentEmail">
                        <div className="areaBars">
                            <div className="bar bar1"></div>
                            <div className="bar bar2"></div>
                            <div className="bar bar3"></div>
                        </div>
                        <h2>Aguardando Verificação...</h2>
                    </div>
                </div>

        </div>


        </div>

    </div>

  )
}

export default ModalConfirmEmail
