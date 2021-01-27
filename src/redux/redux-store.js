import {createStore, combineReducers} from "redux";
import {ItemsReducer} from './items-reducer'
import {NavMenuReducer} from "./nav-menu-reducer";
import {FilmsReducer} from "./films-reducer";
import {filmsSearchReducer} from "./films-search-reducer";
import {userReducer} from "./user-reducer";

let reducers = combineReducers({
    items: ItemsReducer,
    navMenu: NavMenuReducer,
    films: FilmsReducer,
    filmsSearch: filmsSearchReducer,
    user: userReducer
})

let store = createStore(reducers);

export default store