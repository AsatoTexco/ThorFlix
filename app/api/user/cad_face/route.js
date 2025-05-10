import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken"


export async function POST(request) {
  try {
    const body = await request.json();
    const { nome, email } = body;

    if (!nome || !email) {
      return NextResponse.json({ status: false, message: "Os seguintes campos são obrigatórios: nome e email" }, { status: 400 });
    }

    // Iniciar uma transação
    await sql.query('BEGIN');

    // Verificar se o usuário já existe
    const result = await sql.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (result.rowCount > 0) {
      await sql.query('COMMIT');

      const JWT_WEB_TOKEN = process.env.JWT_WEB_TOKEN
      const tokenEmail = jwt.sign(result.rows[0].email, JWT_WEB_TOKEN)

      return NextResponse.json({ status: true, tokenGam:tokenEmail }, { status: 200 });
    } else {
      try {
        // Inserir um novo usuário
        const req = await sql.query(
          `INSERT INTO users (name, email, status) VALUES ($1, $2, $3) RETURNING *`,
          [nome, email, 'confirmed']
        );
        const imgs = ["https://images.pexels.com/photos/5023686/pexels-photo-5023686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                      "https://images.pexels.com/photos/5023690/pexels-photo-5023690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                      "https://images.pexels.com/photos/20278576/pexels-photo-20278576/free-photo-of-arte-sombrio-escuro-vintage.jpeg?auto=compress&cs=tinysrgb&w=600",
                      "https://images.pexels.com/photos/35797/carnival-mask-costume-panel.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                      "https://static-00.iconduck.com/assets.00/thor-hammer-icon-512x512-m5xfr3pr.png",
                      "https://t3.ftcdn.net/jpg/04/43/27/44/360_F_443274438_O9ZIrQ7mjiOh4vKV6hPmPwrwRsBNMJzq.jpg"]

        var indiceAleatorio = Math.floor(Math.random() * imgs.length); 
        let id_new_user = req.rows[0].id

        const insertPerfil = await sql.query("INSERT INTO perfis (nome, id_usuario, image) VALUES ($1, $2, $3) RETURNING * ",["Principal",id_new_user,imgs[indiceAleatorio]])
          
        
        await sql.query('COMMIT');


        const JWT_WEB_TOKEN = process.env.JWT_WEB_TOKEN
        const tokenEmail = jwt.sign(result.rows[0].email, JWT_WEB_TOKEN)

        return NextResponse.json({ status: true, user: req.rows[0], perfil: insertPerfil.rows[0], tokenGam:tokenEmail}, { status: 200 });


      } catch (insertError) {
        await sql.query('ROLLBACK');
        if (insertError.code === '23505') { // Unique violation error code in PostgreSQL
          return NextResponse.json({ status: true, result: "nao cad" }, { status: 200 });
        } else {
          throw insertError;
        }
      }
    }
  } catch (error) {
    await sql.query('ROLLBACK');
    return NextResponse.json({ status: false, error: error.message }, { status: 500 });
  }
}