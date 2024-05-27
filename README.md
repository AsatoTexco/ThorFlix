![imagem site](https://iili.io/JLhI6F9.png)

![imagem site](https://iili.io/JLhIPae.png)


## Requisitos

- Node v18.17+

## Getting Started

Clone Project:
```bash
git clone https://github.com/AsatoTexco/ThorFlix
```

Instalando as Dependências:
```bash
/thorflix

npm install
# or
yarn install
# or 
pnpm install
# or 
bun install 
```
Crie o arquivo `.env` em `/thorflix` e defina as seguintes variaveis de ambiente:
```env

# Banco Postgres Vercel
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NO_SSL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER="default"
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""

JWT_WEB_TOKEN="JeraRush"

# Dados do Aplicativo criado no Facebook
FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="ThorAuth"

# Token de autorização para API TheMovieDB(TMDB)
# https://developer.themoviedb.org/reference/
MOVIE_API=""

```
Com essas configurações você está pronto para executar o ThorFlix

Executar:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Abra [http://localhost:3000](http://localhost:3000) em seu navegador para visualizar o Resultado.

Obs: Se o Aplicativo do Facebook estiver em desenvolvimento, apenas será possível coletar dados e fazer login com a conta do Facebook que possui alguma permissão dentro do aplicativo.
 

 
# Documentação da API

## User

#### Retorna um Token JWT

```http
  POST /api/user/login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. |
| `senha` | `string` | **Obrigatório**.  |


#### Valide o Token JWT 

```http
  POST /api/user/login/validate-token
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | **Obrigatório**. JWT token | 


#### Cadastre usuário 
```http
  POST /api/user/
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. Nome do Usuário |
| `email` | `string` | **Obrigatório**. Email do Usuário |
| `senha` | `string` | **Obrigatório**. Senha do Usuário |
| `data_nascimento` | `string` | **Obrigatório**. Data de Nascimento do Usuário |


#### Cadastrar um filme na lista de assistir do Usuário
```http
  POST /api/user/[email]/assistir
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id_movie` | `string` | **Obrigatório**. id(tmdb) do filme |
| `id_perfil` | `string` | **Obrigatório**. id do perfil |
| `genres` | `string` | **Obrigatório**. gêneros do filme("#","#","#") |



#### Obtenha todos os perfis do Usuário
```http
  GET /api/user/[email]/perfis
```
#### Cadastre um novo Perfil ao usuário
```http
  POST /api/user/[email]/perfis
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. Nome do Perfil |

#### Cadastre usuário por dados do Facebook
```http
  POST /api/user/cad_face/
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. Nome do Facebook |
| `email` | `string` | **Obrigatório**. Email do Facebook |

---
## Filmes
#### Procure por Filmes com títulos originais traduzidos
```http
  GET /api/movies/
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `query`      | `string` | **Opcional**. query para o filtro |
| `page`      | `string` | **Opcional**. página desejada |

#### Obtenha todos os detalhes do filme pelo ID TMDB
```http
  GET /api/movies/[id_tmdb]
```
 

## Perfil

#### Retorna Lista de Filmes para assistir mais tarde e ja assistidos
```http
  GET api/perfil/[id_perfil]/lista_assistir
```

#### Retorna dados de um filme adicionado para assistir mais tarde/assistido
```http
  GET api/perfil/[id_perfil]/lista_assistir/[id_movie]
```

#### Atualiza o status do filme do perfil para assistido
```http
  PUT api/perfil/[id_perfil]/lista_assistir/[id_movie]
```

#### Obtenha uma lista de filmes recomendados para o Perfil
```http
  PUT api/perfil/[id_perfil]/lista_assistir/[id_movie]
```
 
## Facebook Authentication

 #### Lida com as autenticações do Facebook 
```http
  POST & GET api/auth/[...nextauth]
```

# Banco de Dados

## Tabela Usuários
```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    senha varchar(255),
    data_nascimento varchar(255)
);
```
## Tabela Perfis
```sql
CREATE TABLE perfis(
    id SERIAL PRIMARY KEY,
    nome varchar(255), 
    id_usuario INTEGER NOT NULL,
    image VARCHAR(255) ,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
); 
```
## Tabela Lista_assistir
```sql
CREATE TABLE lista_assistir (
    id SERIAL PRIMARY KEY,
    id_perfil INTEGER NOT NULL,
    id_movie INTEGER NOT NULL,
    genres VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_perfil) REFERENCES perfis(id)
); 
```



 ## Documentação de cores

| Cor               | Hexadecimal                                                |
| ----------------- | ---------------------------------------------------------------- |
| Cor 1       | ![#1C8394](https://via.placeholder.com/10/1C8394?text=+) #1C8394 |
| Cor 2       | ![#154B52](https://via.placeholder.com/10/154B52?text=+) #154B52 |
| Cor 3       | ![#000B0D](https://via.placeholder.com/10/000B0D?text=+) #000B0D |
| Cor 4       | ![#390D02](https://via.placeholder.com/10/390D02?text=+) #390D02 |
| Cor Background       | ![#A52502](https://via.placeholder.com/10/A52502?text=+) #A52502 |
 
 
 


## Stacks utilizada

**Framework:** NextJs

**Front-end:** React, TailwindCSS, CSS

**Back-end:** Node, Cookies, Sessions, JWT Token, NextAuth, TheMovieDB API, Postgres Vercel

Veja o Exemplo Hospedado:
[ThorFlix](https://thor-flix.vercel.app/)
