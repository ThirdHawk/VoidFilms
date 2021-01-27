import React from 'react'

export let LoginForm = (props) => {
    let username= React.createRef()
    let password= React.createRef()
    return (
        <div>
            <form>
                <input type="text" placeholder="Username..." ref={username}/>
                <input type="password" placeholder="Password..." ref={password}/>
                <input type="reset" value="Reset"/>
            </form>
            <button onClick={() => props.onLogin(username.current.value, password.current.value)}>Submit</button>
        </div>
    )
}