'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function Page() {

    const seachParams = useSearchParams()
    const router = useRouter()

    const [reqState, setReqState] = useState(false)

    const [mensagem, setMensagem] = useState(false)
    
    if(!seachParams.has("creation_id") || !seachParams.has("tf_token")){
        router.push('/login')
    }

    const creation_id = seachParams.get('creation_id')
    const tf_token = seachParams.get('tf_token')
    
   
    useEffect(() => {

        const handleConfirmEmail = async () => {
        
        
            try{
                const req = await fetch("/api/user/confirmaccount",{
                    method:"POST",
                    
                    body: JSON.stringify({ 
                        creation_id,
                        tf_token 
                        
                    }) 
                })
                const res = await req.json()
                
                
                setMensagem(res.message)

                
            }catch(erro){
                console.log(erro)
            }

 
    
        }
        handleConfirmEmail()
    },[creation_id, tf_token])

    

  return (
    <div >
      {mensagem ? mensagem : "Loading..." }
    </div>
  )
}

export default Page
