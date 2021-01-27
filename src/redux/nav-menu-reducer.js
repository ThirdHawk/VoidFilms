
let initialState = {
    links : [
        // {name : "Home", path : "/"},
        // {name : "Items", path : "/items"},
        {name : "Films List", path : "/films"},
        {name : "Add Films", path : "/films-search"},
    ]
}

export const NavMenuReducer = (state = initialState, action) =>{
    switch(action.type){
        default:
            return state
    }
}
