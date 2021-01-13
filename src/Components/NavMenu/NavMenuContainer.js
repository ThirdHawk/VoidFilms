import React from 'react'
import {connect} from 'react-redux'
import NavMenu from './NavMenu'

let mapStateToProps = (state) => {
    return {
        navMenu : state.navMenu
    }
}

let NavMenuContainer = connect(mapStateToProps, {})(NavMenu)

export default NavMenuContainer