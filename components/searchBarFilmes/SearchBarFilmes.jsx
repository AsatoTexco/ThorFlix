'use client'
import React, { useCallback, useState } from 'react'
import './SearchBarFilmes.css'
import { library } from '@fortawesome/fontawesome-svg-core' 
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import FilmesFilter from '../filmes_filter/FilmesFilter'


function SearchBarFilmes() {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    
    const createQueryString =  async () => {

        let req = await fetch("/api/movies?query="+query+"&page="+page)
        // {page: 1, results: Array(2)},
        let res = await req.json()

         
        setData(res.result.results)

    } 
       
  

    return (
    <div className='area_bar_query'>
        <form action={createQueryString} className='bar_query'>
            <input value={query} onChange={(e) => { 
                setQuery(e.target.value) 
            }} type="text" className='input_query' placeholder='Interestelar...' />
            <input type='submit' className='btn_search_query' value="Buscar"/>       
        </form>

        <FilmesFilter data={data} />


    </div>
  )
}

export default SearchBarFilmes
library.add(far,fab,fas)