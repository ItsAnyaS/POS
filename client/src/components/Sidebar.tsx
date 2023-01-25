import React from "react";
import { useEffect, useState, Dispatch, SetStateAction  } from 'react'
import {FiTrash2} from 'react-icons/fi'
import TipPopUp from "./TipPopUp";

//! Need to change tax rate with each user
const taxRate = 0.10

interface Props {
    cart: ItemObj[],
    setCart: Dispatch<SetStateAction<ItemObj[]>>;
    setShowTipScreen: Dispatch<SetStateAction<boolean>>;
}

interface ItemObj {
    id: number,
    name: string,
    photoLink: string,
    price: number,
    categoryId: number
}

const Sidebar: React.FC<Props> = ({cart, setCart, setShowTipScreen}) => {


const [total, setTotal] = useState(0)
const [tax, setTax] = useState(0)

const calculateTotal = () => {
  let tempTotal = 0
  let tempTax = 0
  cart.forEach(item => {
    tempTotal += item.price
    tempTax += item.price * taxRate
  })
  setTotal(tempTotal)
  setTax(tempTax)
}

const removeItemFromCart = (itemToRemove: ItemObj) => {
let alreadyRemoved = false 
let filteredCart = cart.filter(item => {
  if (item === itemToRemove && !alreadyRemoved){
    alreadyRemoved = true
  }else {
    return item
  }
})
setCart(filteredCart)
window.localStorage.setItem('cart', JSON.stringify(filteredCart))
console.log(filteredCart)
}


useEffect(()=> {

  calculateTotal()
}, [cart])

    return (
        <section id='sidebar'>
        <div className="title-box"><h4>Current sale ({cart.length})</h4></div>
        <div id="currently-in-cart">
          {
            cart.map(item => {
              return (
          <div className="cart-item" key={`cart${item?.id}`}>
            <h4>{item?.name}</h4>
            <FiTrash2 onClick={()=> {removeItemFromCart(item)}}/>
            <p>${item?.price}</p>
          </div>
              )
            })
          }

        </div>
        <div id="tax">
          <h4>Tax</h4>
          <p>${tax}</p>
        </div>
        <div id="discount">
          <h4>Discount</h4>
          <p>$0.00</p>
        </div>
        <div id="checkout-btn" className='hover' onClick={()=> {if (total != 0) {setShowTipScreen(true)}}}><h3>Checkout</h3><p>${total/100}</p></div>
      </section>
    )
}

export default Sidebar