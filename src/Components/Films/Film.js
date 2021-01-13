import React from 'react'
import style from './Films.module.css'

let Film = (props) => {
    return (
        <div className={style.container}>
            <div className={props.film.stato_visione === 0 ? ([-1, 0].includes(props.film.priorita) ? style.filmToWatch : style.filmToWatchWithPriority ) : style.film}>
                <img src={props.film.poster}/>
                <div><b>{props.film.nome_film}</b></div>
                <div><b>{props.film.genere}</b></div>
                <div><i>[By {props.film.nome_richiedente}]</i></div>
                {[-1, 0].includes(props.film.priorita) ? "" :
                    <div><i>Priority: [{props.film.priorita}]</i></div>
                }
                <div><i>ID: {props.film.id}</i></div>
            </div>
        </div>
    )
}

export default Film