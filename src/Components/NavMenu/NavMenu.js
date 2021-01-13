import React from 'react'
import SingleNavElement from "./SingleNavElement";

const NavMenu = (props) => {

    let id = 0;
    let navElements = props.navMenu.links.map(link => <SingleNavElement name={link.name} path={link.path} key={id++} />)

    return (
        <div>
            {navElements}
        </div>
    )
}

export default NavMenu