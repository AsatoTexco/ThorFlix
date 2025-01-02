import React from 'react'
import Menu from "../../components/menu/Menu"
import './filmes.css'
import SearchBarFilmes from "../../components/searchBarFilmes/SearchBarFilmes"

function Page() {

  return (
    <div className='bg-default'>
      <Menu />
      <div className='filmes_page'>

        <div className='content_filmes'>
          <SearchBarFilmes />
        </div>

      </div>
    </div>
  )
}

export default Page
