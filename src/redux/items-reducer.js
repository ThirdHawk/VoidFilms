import baseImg from '../images/question_mark.png'
import appleImg from "../images/apple.png";
import bananaImg from "../images/banana.png";
import pearImg from "../images/pear.png";

export const ADD_ITEM = "addItem"
export const REMOVE_ITEM = "removeItem"

export const addItem = (name, num) => {
    return {
        type: ADD_ITEM,
        payload: {
            name: name,
            num: num
        }
    }
}

export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        payload: {
            id: id
        }
    }
}

let lastId = 2;
let initialState = {
    items: [
        {id: 0, name: "apple", num: "12", src: appleImg},
        {id: 1, name: "banana", num: "5", src: bananaImg},
        {id: 2, name: "pear", num: "8", src: pearImg},
    ]
}

export const ItemsReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_ITEM:
            return {
                items: [
                    ...state.items,
                    {
                        id: ++lastId,
                        name: action.payload.name,
                        num: action.payload.num,
                        src: baseImg
                    }
                ]
            }
        case REMOVE_ITEM:
            return {
                items:[
                    ...state.items.filter(item => item.id !== action.payload.id)
                ]
            }
        default:
            return state;
    }
}