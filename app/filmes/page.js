import React  from 'react'
import Menu from "../../components/menu/Menu"
import './filmes.css' 
import SearchBarFilmes from "../../components/searchBarFilmes/SearchBarFilmes"
import FilmesFilter from "../../components/filmes_filter/FilmesFilter"

function Page() {

   
   
   
  return (
    <div className='bg-default'> 
      <Menu />
      <div className='filmes_page'> 
        <div className='content_filmes'> 
            <SearchBarFilmes/> 
        </div>

      </div>
    </div>
  )
}

export default Page
