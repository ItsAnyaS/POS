import React from "react"
import { Nav } from "react-bootstrap"
import { GrTransaction } from 'react-icons/gr'
import { NavLink } from "react-router-dom"
const Navbar = () => {
return ( 
<nav id="navbar">
      <div className="nav-item">1</div>
      <div className="nav-item"><NavLink to='/transactions'><GrTransaction/></NavLink></div>
      <div className="nav-item">3</div>
</nav>
)
}

export default Navbar