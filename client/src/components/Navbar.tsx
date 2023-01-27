import React from "react"
import { GrTransaction } from 'react-icons/gr'
import {AiOutlineHome } from 'react-icons/ai'
import { GiHamburgerMenu} from 'react-icons/gi'
import { NavLink } from "react-router-dom"
import Cookies from 'js-cookie'
import { useEffect, useState } from "react"

const Navbar = () => {

const [usable, setUsable] = useState<boolean>(true)

const validateUser = async() => {
let user = Cookies.get('auth-token')
      if (user){
            let req = await fetch(`/auth/${user}`)
            let res = await req.json()
            if (res.message === 'valid user'){
            console.log('logged in')
            setUsable(true)
            }else {
            console.log('not logged in')
            setUsable(false)
            }
      }else {
            setUsable(false)
      }
}

useEffect(()=> {
      validateUser()
},[])
      
return ( 
<nav id="navbar">
      <div className="nav-item"><NavLink style={{"color": "black"}} to={usable? '/': '/login'}><AiOutlineHome/></NavLink></div>
      <div className="nav-item"><NavLink to={usable?'/transactions': '/login'}><GrTransaction/></NavLink></div>
      <div className="nav-item"><GiHamburgerMenu/></div>
</nav>
)
}

export default Navbar