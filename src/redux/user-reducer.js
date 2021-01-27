export const LOG_IN = "logIn"
export const LOG_OUT = "logOut"

export const logIn = () => ({
    type: LOG_IN
})
export const logOut = () => ({
    type: LOG_OUT
})

let initialState = {
    logged: false,
    lastVisitedPage: "/"
}

export let userReducer = (state = initialState, action) => {
    switch(action.type){
        case LOG_IN:
            state = {...state, logged : true}
            return state
        case LOG_OUT:
            return {
                ...state,
                logged:false
            }
        default:
            return state
    }
}