const SET_FILMS_LIST = "setFilmsList";
const SET_IS_LOADING = "setIsLoading";
const SET_CURRENT_API_ENDPOINT = "setCurrentApiEndpoint"
const RESET_FILMS_LIST = "resetFilmsList"
const REMOVE_FILM_FROM_LIST = "removeFilmFromList"

export const setFilmsListAction = (obj) => ({
    type: SET_FILMS_LIST,
    payload: obj
})
export const setIsLoading = (status) => ({
    type: SET_IS_LOADING,
    payload: status
})
export const setCurrentApiEndpoint = (endpoint) => ({
    type: SET_CURRENT_API_ENDPOINT,
    payload: endpoint
})
export const resetFilmsList = () => ({
    type: RESET_FILMS_LIST,
    payload: null
})
export const removeFilmFromList = (film) => ({
    type: REMOVE_FILM_FROM_LIST,
    payload: {
        film
    }
})

let initialState = {
    list: [],
    isLoading: false,
    currentApiEndpoint: "/api/films"
}

export const FilmsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILMS_LIST:
            return {
                ...state,
                list: action.payload
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case SET_CURRENT_API_ENDPOINT:
            return {
                ...state,
                currentApiEndpoint: action.payload
            }
        case RESET_FILMS_LIST:
            return {
                ...state,
                list: []
            }
        case REMOVE_FILM_FROM_LIST:
            return {
                ...state,
                list: [...state.list.filter(film => film.id !== action.payload.film.id)]
            }
        default:
            return state
    }
}
