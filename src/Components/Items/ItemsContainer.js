import React from 'react'
import {addItem, removeItem} from '../../redux/items-reducer'
import {connect} from 'react-redux'
import Items from './Items'

let mapStateToProps = (state) => {
    return {
        items: state.items.items
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addItem: (name, num) => {
            dispatch(addItem(name, num))
        },
        removeItem: (id) => {
            dispatch(removeItem(id))
        }
    }
}

let ItemsContainer = connect(mapStateToProps, mapDispatchToProps)(Items)

export default ItemsContainer