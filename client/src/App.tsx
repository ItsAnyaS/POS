import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import CategorySelectionBar from './components/CategorySelectionBar';
import ItemsByCategory from './components/ItemsByCategory';
import TransactionPage from './components/TransactionPage';
import TipPopUp from './components/TipPopUp';
import CheckoutPage from './components/CheckoutPage';
import SignUp from './components/SignUp';
import {useEffect, useState, createContext, useMemo } from 'react'
import {BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom'
import Cookies from 'js-cookie';
import Login from './components/Login';
import Keypad from './components/Keypad';
export const UserContext = createContext({})

interface ItemObj {
  id: number,
  name: string,
  photoLink: string,
  price: number,
  categoryId: number
}

interface UserObj {
  authToken: string,
}


function App() {

const [cart, setCart] = useState<ItemObj[]>([])
const [showTipScreen, setShowTipScreen]= useState<boolean>(false)
const [showCheckoutScreen, setShowCheckoutScreen] = useState<boolean>(false)
const [finalTipAmount, setFinalTipAmount] = useState<number>(0)
const [globalUser, setGlobalUser] = useState<UserObj>({authToken: ''})
const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)
const [isShowingCustomCatMenu, setIsShowingCustomCatMenu] = useState<boolean>(false)
const [isSigningUp, setIsSigningUp] = useState<boolean>(false)
const [isDeletingItems, setIsDeletingItems] = useState<boolean>(false)
const [items, setItems] = useState<ItemObj[]>([])
// const navigate = useNavigate()


const getCartFromLocalStorage = () => {
  let lsCart = window.localStorage.getItem('cart')
  if (lsCart) {
    setCart(JSON.parse(lsCart))
  } else {
    window.localStorage.setItem('cart', JSON.stringify([]))
  }
}


const submitTip = (tipAmount: number) => {
setFinalTipAmount(tipAmount)
setShowTipScreen(false)
setShowCheckoutScreen(true)
}

const getUser = async() => {
  let user = Cookies.get('auth-token')
  if (user){
    let req = await fetch(`/auth/${user}`)
    let res = await req.json()
    if (res.message === 'valid user'){
      // console.log('logged in')
      setIsLoggedIn(true)
      getCartFromLocalStorage()
    }else {
      // console.log('not logged in')
      setIsLoggedIn(false)
      return redirect('/login')
    }
  }else {
    setIsLoggedIn(false)
  }
}

const getItems = async() => {
  let req = await fetch('/items')
  let res = await req.json()
  setItems(res)
}



useEffect(()=> {
  getUser()
  getItems()
}, [])

const value = useMemo(() => ({ globalUser, setGlobalUser }), [globalUser, setGlobalUser]);

  return (
    <div className="App" onClick={()=> {setIsShowingCustomCatMenu(false)}}>
      <UserContext.Provider value={value}>
      <Router>
        {!isLoggedIn && isSigningUp && <SignUp setIsLoggedIn={setIsLoggedIn} setIsSigningUp={setIsSigningUp}/>}
        {!isLoggedIn && !isSigningUp && <Login setIsSigningUp={setIsSigningUp} setIsLoggedIn={setIsLoggedIn}/>}
        { isLoggedIn && <Navbar/>}
        { isLoggedIn && <CategorySelectionBar setItems={setItems} setIsDeletingItems={setIsDeletingItems} setIsLoggedIn={setIsLoggedIn} isShowingCustomCatMenu={isShowingCustomCatMenu} setIsShowingCustomCatMenu={setIsShowingCustomCatMenu}/>}
        { isLoggedIn && <Sidebar cart={cart} setCart={setCart} setShowTipScreen={setShowTipScreen}/>}
        <Routes>
          { isLoggedIn && <Route path='/' element={<Main items={items} setItems={setItems} isDeletingItems={isDeletingItems} setIsDeletingItems={setIsDeletingItems} setCart={setCart}/>}/>}
          { isLoggedIn &&  <Route path='/categories/:id' element={ <ItemsByCategory items={items} isDeletingItems={isDeletingItems} setIsDeletingItems={setIsDeletingItems} setItems={setItems} setCart={setCart}/>}/>}
          { isLoggedIn && <Route path='/transactions' element={ <TransactionPage/> }/> }
          { isLoggedIn && <Route path='/keypad' element={ <Keypad setCart={setCart} /> }/> }
          <Route path='login' element={<Login setIsSigningUp={setIsSigningUp} setIsLoggedIn={setIsLoggedIn}/>}/>
        </Routes>
       {showTipScreen && <TipPopUp cart={cart} setShowTipScreen={setShowTipScreen} submitTip={submitTip}/>}
       {showCheckoutScreen && <CheckoutPage  setCart={setCart} cart={cart} finalTipAmount={finalTipAmount} setShowCheckoutScreen={setShowCheckoutScreen} />}
    </Router>
    </UserContext.Provider>
    </div>
  )
}

export default App;
