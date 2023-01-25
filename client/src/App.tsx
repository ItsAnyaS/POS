import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import CategorySelectionBar from './components/CategorySelectionBar';
import ItemsByCategory from './components/ItemsByCategory';
import TransactionPage from './components/TransactionPage';
import TipPopUp from './components/TipPopUp';
import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
interface ItemObj {
  id: number,
  name: string,
  photoLink: string,
  price: number,
  categoryId: number
}

function App() {

const [cart, setCart] = useState<ItemObj[]>([])
const [showTipScreen, setShowTipScreen]= useState<boolean>(true)

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
console.log(cart)
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <CategorySelectionBar/>
        <Sidebar cart={cart} setCart={setCart} setShowTipScreen={setShowTipScreen}/>
        <Routes>
          <Route path='/' element={<Main setCart={setCart}/>}/>
          <Route path='/categories/:id' element={ <ItemsByCategory setCart={setCart}/>}/>
          <Route path='/transactions' element={ <TransactionPage/> }/> 
        </Routes>
       {showTipScreen && <TipPopUp cart={cart} setShowTipScreen={setShowTipScreen}/>}
    </Router>
    </div>
  )
}

export default App;
