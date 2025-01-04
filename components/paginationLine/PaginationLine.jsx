import React from 'react'
import './PaginationLine.css'


import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'


function PaginationLine({ qntPage, pageAtual, query }) {

    if (!qntPage || !pageAtual || !query) {
        return <h1>Ocorreu um Erro, já estamos resolvendo</h1>
    }  
    const totalPages = parseInt(qntPage)
    const currentPage = parseInt(pageAtual) 
    const paginationItems = []

    const createPageLink = (page, isSelected) => {
        paginationItems.push(
            <Link key={page} href={"/filmes?q=" + query + "&page=" + (page)}>
                <div className={isSelected ? "selectedPageFL" : "selectPageFL"}>{page}</div>
            </Link>
        )
    } 
    const createPointsPagination = () => {
        paginationItems.push(
            <div key={Math.random()}>
                <div className={"selectPageFL"}>...</div>
            </div>
        )
    }

    if (totalPages <= 9) { 
        for (let index = 0; index < totalPages; index++) {
            createPageLink(index + 1, currentPage == (index + 1))
        } 
    } else {
        if (currentPage <= 5) {
            for (let index = 0; index < 5; index++) {
                createPageLink(index + 1, currentPage == (index + 1))
            }
        } else {
            createPageLink(1, false) 
            createPointsPagination()

            if (totalPages - currentPage >= 5) {
                createPageLink(currentPage - 2, false)
                createPageLink(currentPage - 1, false)
            }
        } 
        if (totalPages - currentPage >= 5) { 
            if (currentPage <= 5) {
                createPageLink(6, false)
                createPageLink(7, false)
            } else {
                createPageLink(currentPage, true)
                createPageLink(currentPage + 1, false)
                createPageLink(currentPage + 2, false)
            }

            createPointsPagination()
            createPageLink(totalPages, false)

        } else {
            for (let index = totalPages - 6; index < totalPages + 1; index++) {
                createPageLink(index, index == currentPage)
            }
        }
    }

    return (
        <div className='paginationLineArea'>
            <div className="contentPag">

                <Link href={"/filmes?q=" + query + "&page=" + (currentPage > 1 ? currentPage - 1 : currentPage)} className="selectPageBN">
                    <FontAwesomeIcon icon="fa-solid fa-angle-left" />
                </Link>

                <div className="numbersPaginationSel">
                    {paginationItems}
                </div>

                <Link href={"/filmes?q=" + query + "&page=" + (currentPage + 1 > totalPages ? totalPages : currentPage + 1)} className="selectPageBN">
                    <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                </Link>

            </div>

        </div>
    )
}

export default PaginationLine
library.add(far, fas, fab)