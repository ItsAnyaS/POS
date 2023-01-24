import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import CategorySelectionBar from './components/CategorySelectionBar';
import {useEffect, useState} from 'react'
// import Button from 'react-bootstrap/Button'
// import 'bootstrap/dist/css/bootstrap.min.css';
interface ItemObj {
  id: number,
  name: string,
  photoLink: string,
  price: number,
  categoryId: number
}

function App() {
//!Solve how to pass interfaces as props

const [cart, setCart] = useState<ItemObj[]>([])

const getCartFromLocalStorage = () => {
  let lsCart = window.localStorage.getItem('cart')
  if (lsCart) {
    setCart(JSON.parse(lsCart))
  } else {
    window.localStorage.setItem('cart', JSON.stringify([]))
  }
}

  useEffect(()=> {
    getCartFromLocalStorage()

  }, [])

  return (
    <div className="App">
   <CategorySelectionBar/>
    <Main setCart={setCart}/>
    <Navbar/>
    <Sidebar cart={cart} setCart={setCart}/>
    </div>
  )
}

export default App;
