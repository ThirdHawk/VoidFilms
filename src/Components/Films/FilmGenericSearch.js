import React from 'react'
import style from './Films.module.css'

export let FilmGenericSearch = (props) => {
    return (
        <div className={props.film.hasOwnProperty('inDb') ? style.genericSearchFilm_inDb : style.genericSearchFilm}>
            <div>
                {props.film.hasOwnProperty('inDb') ? <div>Film già nel database</div> : ""}
                {props.film.Poster !== "N/A" ? <img src={props.film.Poster} /> : <div>Poster: {props.film.Poster}</div>}
                <div><i>Type : {props.film.Type}</i></div>
                <div><b>{props.film.Title}</b></div>
                <div><b>{props.film.Year}</b></div>
                {props.film.hasOwnProperty('inDb') ? "" :
                    <input type="button" value="Aggiungi" onClick={() => props.addToDb(props.film)} className={style.addBtn} draggable="false"/>
                }
            </div>
        </div>
    )
}