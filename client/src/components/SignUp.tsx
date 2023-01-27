import React, { Dispatch, SetStateAction, useState } from "react";
import '../styles/SignUp.css'
import {stateSalesTax, usStates }from '../salesTax'
import Cookies from 'js-cookie'


interface Props {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
    setIsSigningUp: Dispatch<SetStateAction<boolean>>
}


const SignUp: React.FC<Props> = ({setIsLoggedIn, setIsSigningUp}) => {
    const [userDetails, setUserDetails] = useState({country: 'United States', state: "Alabama"})
    const handleChange = (name:string, value: string) => {
        setUserDetails({
            ...userDetails, [name]: value
        })
    }

    const findStateTax = () => {
        for ( let state in stateSalesTax) {
            if (state === userDetails.state){
              return (stateSalesTax as any)[state]
            }
          }
    }

    const handleSignUp = async(e: React.SyntheticEvent) => {
        e.preventDefault()
        let req = await fetch('/auth/signup', {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(userDetails)
        })
        let res = await req.json()
       if (res.message === 'account successfully created'){
        window.localStorage.setItem('taxRate', JSON.stringify({tax: findStateTax().toFixed(2)}))
        Cookies.set('auth-token', res.authToken)
        setIsLoggedIn(true)
        setIsSigningUp(false)
       }

    }

console.log(userDetails)
return (
    <div id="sign-up-page">
        <div id="sign-up-container">
            <h1>Sign Up</h1>
            <form id="sign-up-form" onSubmit={(e)=> {handleSignUp(e)}}>
                <fieldset>
                    <legend>Username</legend>
                    <input type="text" required onChange={(e)=> {handleChange(e.target.name, e.target.value)}} name="username"/>
                </fieldset>
                <fieldset>
                    <legend>Password</legend>
                    <input type="password" required name="password" onChange={(e)=> {handleChange(e.target.name, e.target.value)}}/>
                </fieldset>
                <fieldset>
                    <legend>Country</legend>
                    <select name="country" required onChange={(e)=> {handleChange(e.target.name, e.target.value)}} >
                        <option value="United States">United States</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>State</legend>
                    <select name="state" required onChange={(e)=> {handleChange(e.target.name, e.target.value)}}>
                        { usStates.map(state => {
                            return (
                                <option value={state}>{state}</option>
                            )
                        })}
                    </select>
                </fieldset>
                <button>Sign up</button>
            </form>
            <p>Already have an account? <a onClick={()=> {setIsSigningUp(false)}}>Login here</a></p>
        </div>
    </div>
)
}

export default SignUp