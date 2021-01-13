import {createStore, combineReducers} from "redux";
import {ItemsReducer} from './items-reducer'
import {NavMenuReducer} from "./nav-menu-reducer";
import {FilmsReducer} from "./films-reducer";

let reducers = combineReducers({
    items: ItemsReducer,
    navMenu: NavMenuReducer,
    films: FilmsReducer
})

let store = createStore(reducers);

export default store