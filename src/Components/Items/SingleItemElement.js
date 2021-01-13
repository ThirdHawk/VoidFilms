import React from 'react'
import style from './Item.module.css'

const SingleItemElement = (props) => {
    return(
        <div>
            <img src={props.src}/>
            <span className={style.itemRemove} onClick={() => props.removeItem(props.id)}>X</span>
            <span className={style.itemNum}>{props.num}</span>
            <h3 className={style.itemName}>{props.name}</h3>
        </div>
    )
}

export default SingleItemElement