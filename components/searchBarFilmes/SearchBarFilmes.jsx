'use client'
import React, { useCallback, useEffect, useState } from 'react'
import './SearchBarFilmes.css'
import { library } from '@fortawesome/fontawesome-svg-core' 
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import FilmesFilter from '../filmes_filter/FilmesFilter'
import LoadingCircles from '@components/loading/loadingCircles/LoadingCircles'
import Cookies from 'js-cookie';


function SearchBarFilmes() {
 
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)
    const [data, setData] = useState(false)

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect( () => {
        
        const loadDataMoviesSearch = async () => {
            const queryParam = searchParams.get('q') 
            const pageParam = searchParams.get('page') 
            
            if(!queryParam){ 
                if(typeof Cookies.get("perfil") == undefined){
                    router.push("/perfis")
                    return 
                }
                
                var id_perfil = JSON.parse(Cookies.get("perfil")).id 
                let req = await fetch("/api/perfil/"+id_perfil+"/recommended")
                let res = await req.json() 
                setData(res.result)  
                return      
            }

            setQuery(queryParam)
            let req = await fetch("/api/movies?query="+queryParam+"&page="+pageParam)
            let res = await req.json() 
            setData(res.result.results)  
            
        }

        loadDataMoviesSearch()

    },[searchParams,router,pathname])
     
    const createQueryString =  async () => { 
       
        setData(false)
        const params = new URLSearchParams(searchParams.toString())
        params.set('q',query)
        params.set('page',1)
        router.push(pathname+"?"+params)
        
       
    }
       
    
    return (
    <div className='area_bar_query'>
        <form action={createQueryString} className='bar_query'>
            <input value={query} onChange={(e) => { 
                setQuery(e.target.value)  
            }} type="text" className='input_query' placeholder='Interestelar...' />
            <button type="submit" className='btn_search_query'>
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </button>
        </form>
        {!data &&   
            <div className="spaceLoading">
                <LoadingCircles />
            </div>
        }
        {data &&  
            <FilmesFilter data={data} /> 
        }

    </div>
  )
}

export default SearchBarFilmes
library.add(far,fab,fas)