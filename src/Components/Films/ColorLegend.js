import React from 'react'
import style from './Films.module.css'

export let ColorLegend = () => {
    return (
        <div>
            <div className={style.filmToWatchWithPriority}>Film estratti da vedere</div>
            <div className={style.filmToWatch}>Film da vedere ma non estratti</div>
            <div className={style.film}>Film già visti</div>
        </div>
    )
}