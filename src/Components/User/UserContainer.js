import React from 'react'
import {connect} from 'react-redux'
import {logIn, logOut} from "../../redux/user-reducer";
import {LoginForm} from "./LoginForm";
import Cookies from 'js-cookie'

class UserContainer extends React.Component{

    constructor() {
        super();
        this.username = process.env.loginUsername
        this.password = process.env.loginPassword
    }
    componentDidMount() {
        if(Cookies.get('logged') === 'true'){
            this.redirectToFilms()
        }
    }

    redirectToFilms () {
        window.location.replace('/films')
    }

    render() {
        return (
            <div>
                <LoginForm
                    onLogin={(username, password) => {
                        if([undefined, null, ""].includes(username) || [undefined, null, ""].includes(password)){
                            alert("One or both fields are empty")
                        }else{
                            if(username === this.username && password === this.password){
                                Cookies.set('logged', true)
                                this.redirectToFilms()
                            }else{
                                Cookies.set('logged', false)
                            }
                        }
                    }}/>
            </div>
        )
    }
}



let mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {
    logIn,
    logOut
})(UserContainer)