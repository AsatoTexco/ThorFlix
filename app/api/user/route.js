import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 

export async function POST(request) {
  try { 

    // verificar se existe o creation_id na tabela token_verify -> criar a conta  
    // tem q existir ->
    const body = await request.json()
    const { name, password, creation_id} = body
    if(name.trim().length == 0){
      return NextResponse.json({status:false, message:"Preencha seu nome corretamente" }, { status: 200 });
    }
    
    if(password.length == 0){
      return NextResponse.json({status:false, message:"Preencha a senha corretamente" }, { status: 200 });
    }
    
    
    
    const result = await sql.query(`SELECT * FROM token_verify WHERE id = $1 `,[creation_id]);
    
    if(result.rowCount == 0){
      return NextResponse.json({status:false, message:"Não foi encontrado nenhuma solicitação para seu cadastro" }, { status: 200 });
    } 
    if(!result.rows[0].status){
      return NextResponse.json({status:false, message:"Clique no link enviado no seu E-mail e tente novamente" }, { status: 200 });
    }
    // email está verificado
    // result.rows[0]
    
    const r_user = await sql.query("SELECT * FROM users WHERE email = $1",[result.rows[0].email])
   
    if(r_user.rowCount > 0){
      return NextResponse.json({status:false, message:"Já existe um usuário cadastrado com esse E-mail" }, { status: 200 });
    }
    
    const tsm_now = new Date().toISOString()
    const c_user = await sql.query("INSERT INTO users(name,email,password,status,created_at) VALUES($1,$2,$3,$4,$5) RETURNING *",[name,result.rows[0].email,password,"confirmed", tsm_now])
    
    // const req = await sql.query("INSERT INTO users (nome, email, senha, data_nascimento) VALUES ($1, $2, $3, $4)  RETURNING * ",[nome,email,senha,data_nascimento])
    
    
    const imgs = ["https://images.pexels.com/photos/5023686/pexels-photo-5023686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/5023690/pexels-photo-5023690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/20278576/pexels-photo-20278576/free-photo-of-arte-sombrio-escuro-vintage.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/35797/carnival-mask-costume-panel.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://static-00.iconduck.com/assets.00/thor-hammer-icon-512x512-m5xfr3pr.png",
      "https://t3.ftcdn.net/jpg/04/43/27/44/360_F_443274438_O9ZIrQ7mjiOh4vKV6hPmPwrwRsBNMJzq.jpg"]
      
      var indiceAleatorio = Math.floor(Math.random() * imgs.length); 
      let id_new_user = c_user.rows[0].id
       

    const insertPerfil = await  sql.query("INSERT INTO perfis (nome, id_usuario, image) VALUES ($1, $2, $3) RETURNING * ",["Principal",id_new_user,imgs[indiceAleatorio]])

    if(insertPerfil.rowCount == 0){
      return NextResponse.json({status:false, message:"Erro ao cadastrar usuário" }, { status: 200 })
    }
    

    let req = await fetch(`${process.env.THORFLIX_HOST_URL}/api/user/login`,{
      method:"POST",
      body:JSON.stringify({
        email: c_user.rows[0].email, password:password
      })
    })
    const res = await req.json()   
    

    return NextResponse.json({status:true,message: "Usuário criado com Sucesso!", tokenLoginAutomatic: res.token  }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}