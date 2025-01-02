import React from 'react'
import './PaginationLine.css'


import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'


function PaginationLine(props) {
 
    if (!props.qntPage || !props.pageAtual || !props.query) {
        return
    }
    

    const qnt = props.qntPage
    const sel = parseInt(props.pageAtual)
    const items = []
    const host = props.host

    if (qnt <= 9) {

        for (let index = 0; index < qnt; index++) {
            const escolhido = sel == (index + 1)
            items.push(
                <Link href={"/filmes?q=" + props.query + "&page=" + (index + 1)}>
                    <div key={index} className={escolhido == true ? "selectedPageFL" : "selectPageFL"}>{index + 1}</div>
                </Link>
            )
        }

    } else {

        if (sel <= 5) {

            for (let index = 0; index < 5; index++) {
                const escolhido = sel == (index + 1)
                items.push(
                    <Link href={"/filmes?q=" + props.query + "&page=" + (index + 1)}>
                        <div key={index} className={escolhido == true ? "selectedPageFL" : "selectPageFL"}>{index + 1}</div>
                    </Link>
                )
            }

        } else {

            items.push(
                <Link href={"/filmes?q=" + props.query + "&page=" + 1}>
                    <div className={"selectPageFL"}>1</div>
                </Link>
            )
            items.push(
                <div>
                    <div className={"selectPageFL"}>...</div>
                </div>
            )

            if (qnt - sel >= 5) {

                items.push(
                    <Link href={"/filmes?q=" + props.query + "&page=" + (sel - 2)}>
                        <div className={"selectPageFL"}>{sel - 2}</div>
                    </Link>
                )
                items.push(
                    <Link href={"/filmes?q=" + props.query + "&page=" + (sel - 1)}>
                        <div className={"selectPageFL"}>{sel - 1}</div>
                    </Link>
                )

            }

        }

        if (qnt - sel >= 5) {

            if (sel <= 5) {

                items.push(
                    <Link href={"/filmes?q=" + props.query + "&page=" + (6)}>
                        <div className={"selectPageFL"}>{6}</div>
                    </Link>
                )
                items.push(
                    <Link href={"/filmes?q=" + props.query + "&page=" + (7)}>
                        <div className={"selectPageFL"}>{7}</div>
                    </Link>
                )
            } else {

                items.push(
                    <Link href={"/filmes?q=" + props.query + "&page=" + (sel)}>
                        <div className={"selectedPageFL"}>{sel}</div>
                    </Link>
                )
                items.push(
                    <Link href={"/filmes?q=" + props.query + "&page=" + (sel + 1)}>
                        <div className={"selectPageFL"}>{sel + 1}</div>
                    </Link>
                )
                items.push(
                    <Link href={"/filmes?q=" + props.query + "&page=" + (sel + 2)}>
                        <div className={"selectPageFL"}>{sel + 2}</div>
                    </Link>
                )
            }

            items.push(
                <div>
                    <div className={"selectPageFL"}>...</div>
                </div>
            )
            items.push(
                <Link href={"/filmes?q=" + props.query + "&page=" + (qnt)}>
                    <div className={"selectPageFL"}>{qnt}</div>
                </Link>
            )
        } else {
            for (let index = qnt - 6; index < qnt + 1; index++) {
                const escolhid = index == sel 
                items.push(
                    <Link href={"/filmes?q=" + props.query + "&page=" + (index)}>
                        <div className={escolhid == true ? "selectedPageFL" : "selectPageFL"}>{index}</div>
                    </Link>
                )
            }
        }
    }

    return (
        <div className='paginationLineArea'>
            <div className="contentPag">

                <Link href={"/filmes?q=" + props.query + "&page=" + (sel > 1 ? sel-1 : sel)} className="selectPageBN">
                    <FontAwesomeIcon icon="fa-solid fa-angle-left" />
                </Link>

                <div className="numbersPaginationSel">
                    {items}
                </div>

                <Link href={"/filmes?q=" + props.query + "&page=" + (sel+1 > qnt ? qnt : sel + 1 )} className="selectPageBN">
                    <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                </Link>

            </div>

        </div>
    )
}

export default PaginationLine
library.add(far, fas, fab)