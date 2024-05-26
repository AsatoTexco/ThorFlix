export async function validarToken(token){
    let req = await fetch("/api/login/validate-token",{
        method:"POST",
        body:JSON.stringify({
            token:token
        })
    })
    let res = await req.json()
     
}