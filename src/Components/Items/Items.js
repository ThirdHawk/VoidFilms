import React from 'react'
import style from './Item.module.css'

import SingleItemElement from "./SingleItemElement";

const Items = (props) => {
    let nameRef = React.createRef()
    let numRef = React.createRef()
    let items = props.items.map(item => <SingleItemElement name={item.name} num={item.num} src={item.src} id={item.id} removeItem={props.removeItem}/>)
    let onClick = () => {
        let name = nameRef.current.value
        let num = numRef.current.value
        let invalidValues = ["", null, undefined]
        if(invalidValues.includes(name) || invalidValues.includes(num)){
            return false;
        }
        if(num < 1){
            num = 1;
        }else if (num > 100){
            num = 100
        }
        props.addItem(name, num)
        nameRef.current.value = ""
        numRef.current.value = ""
    }
    return(
        <div>
            <input type="text" ref={nameRef} placeholder="Name of the item..."/>
            <input type="number" ref={numRef} defaultValue={1} min={1} max={100} placeholder="Number of items..."/>
            <button onClick={onClick}>Add New</button>
            <div className={style.itemContainer}>
                {items}
            </div>
        </div>
    )
}

export default Items