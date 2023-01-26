import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext, Dispatch, SetStateAction } from "react";
import { UserContext } from '../App'
import Cookies from 'js-cookie'

interface UserCredentialsObj {
    username: string,
    password: string
}

interface Props {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

const Login: React.FC<Props> = ({setIsLoggedIn}) => {
    // const {setGlobalUser} = useContext(UserContext)
    const [userCredentials, setUserCredentials] = useState<UserCredentialsObj>({username: '', password: ''})

    const loginUser = async() => {
        let req = await fetch('http://localhost:3000/auth/login', {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                username: userCredentials.username,
                password: userCredentials.password
            })
        })
        let res = await req.json()
        if (res.error){
            console.log('try again')
        }else if (res.authToken){
            console.log('logged in')
            // console.log( res)
            setIsLoggedIn(true)
            // console.log(res.authToken)
            Cookies.set('auth-token', res.authToken)
        }
    }

    const handleChange = (value:string , name: string) => {
        setUserCredentials({
            ...userCredentials, [name]: value
        })
    }

    const handleFormSubmit =(e: React.SyntheticEvent) => {
        e.preventDefault()
        loginUser()
    }


// console.log(userCredentials)
    return (
        <div id="login-page">
            <div id="login-container">
                <form id="login-form" onSubmit={(e)=> {handleFormSubmit(e)}}>
                    <h1>Login</h1>
                    <fieldset>
                        <legend>Username</legend>
                        <input onChange={(e)=> {handleChange(e.target.value, e.target.name)}} required type="text" name="username" />
                    </fieldset>
                    <fieldset>
                        <legend>Password</legend>
                        <input onChange={(e)=> {handleChange(e.target.value, e.target.name)}} type="text" required name="password" />
                    </fieldset>
                    <button>LOGIN</button>
                </form>
            </div>
        </div>
    )
}

export default Login