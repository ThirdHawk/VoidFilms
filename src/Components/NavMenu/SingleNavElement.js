import React from 'react'
import {NavLink} from "react-router-dom";
import style from '../NavMenu/SingleItemElement.module.css'

const SingleNavElement = (props) => {
    return (
        <NavLink to={props.path} className={style.navLink} activeClassName={style.active} exact={true}>
            {props.name}
        </NavLink>
    )
}

export default SingleNavElement