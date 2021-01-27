export const SET_FILM_TO_SEARCH = "setFilmToSearch"
export const RESET_FILM_TO_SEARCH = "resetFilmToSearch"
export const SET_FILMS_SEARCH_LIST = "setFilmsSearchList"
export const RESET_FILMS_SEARCH_LIST = "resetFilmsSearchList"
export const ADD_FILM_TO_DB = "addFilmToDb"

export const setFilmToSearch = (filmName) => ({
    type: SET_FILM_TO_SEARCH,
    payload: filmName
})
export const resetFilmToSearch = () => ({
    type: RESET_FILM_TO_SEARCH
})
export const setFilmsList = (array) => ({
    type: SET_FILMS_SEARCH_LIST,
    payload : array
})
export const resetFilmsList = () => ({
    type: RESET_FILMS_SEARCH_LIST
})
export const addFilmToDb = (filmObj) => ({
    type: ADD_FILM_TO_DB,
    payload: filmObj
})

let initialState = {
    searchList: [],
    filmToSearch: "",
    filmToAdd: {}
}

export let filmsSearchReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_FILM_TO_SEARCH:
            return {
                ...state,
                filmToSearch: action.payload
            }
        case RESET_FILM_TO_SEARCH:
            return {
                ...state,
                filmToSearch: ""
            }
        case SET_FILMS_SEARCH_LIST:
            return {
                ...state,
                searchList: action.payload
            }
        case RESET_FILMS_SEARCH_LIST:
            return {
                ...state,
                searchList: []
            }
        case ADD_FILM_TO_DB:
            let updatedSearchList = state.searchList.map(film => {
                if(film.imdbID === action.payload.imdbID){
                    film.inDb = true
                }
                return film
            })
            return {
                ...state,
                searchList: updatedSearchList
            }
        default:
            return state;
    }
}