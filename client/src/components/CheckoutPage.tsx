import React, { useEffect, useRef, Dispatch, SetStateAction} from "react";
import {BsChevronUp} from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import Cookies from 'js-cookie'
let taxRate = 0
let data = window.localStorage.getItem('taxRate')
if (data){
  taxRate = parseFloat(JSON.parse(data || "").tax)/100
}


interface ItemObj {
    id: number,
    name: string,
    photoLink: string,
    price: number,
    categoryId: number
  }

  interface Props {
      cart: ItemObj[],
      finalTipAmount: number,
      setShowCheckoutScreen: Dispatch<SetStateAction<boolean>>
      setCart: Dispatch<SetStateAction<ItemObj[]>>
      
    }
    
    const useKey = (key: string, callback: (e: KeyboardEvent) => void) => {
        const callbackRef = useRef<(e: KeyboardEvent) => void>(callback);
      
        useEffect(() => {
          callbackRef.current = callback;
        });
      
        useEffect(() => {
          const handle = (e: KeyboardEvent) => {
            if (e.code === key) {
              callbackRef.current(e);
            }
          };
      
          document.addEventListener('keypress', handle);
          return () => document.removeEventListener('keypress', handle);
        }, [key]);
      };

const CheckoutPage: React.FC<Props> = ({cart, setCart, finalTipAmount, setShowCheckoutScreen}) => {

const calculateCartTotal = () => {

    let cartTotal = 0 
     cart.forEach(item => {
        cartTotal += item.price
    })
    return cartTotal
}   

const calculateTax =() => {
  let tax = 0
  cart.forEach((item) => {
    // console.log(item.price* taxRate)
    tax += item.price * taxRate
  })
  // console.log("tax pre100", tax)
  tax = Math.floor(tax)
  return tax
}

const createTransaction =async() => {
//!need to change session id
  let tip = (finalTipAmount*100).toFixed()
  let tax = calculateTax()
  let total = calculateCartTotal() + tax + parseInt(tip)
  console.log('tip', tip)
  console.log('tax', tax)
  console.log('total', total)
  let authToken = Cookies.get('auth-token')
  let req = await fetch('/transactions', {
      method: 'POST',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(
          {number_of_items: cart.length,
            items: cart,
            total_cost: total,
            total_tax: tax,
            total_tip: parseInt(tip),
            authToken: authToken
          })
      })
      if (req.ok){


        req = await fetch(`/sessions/update/${authToken}`, {
          method: "PATCH",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({
            number_of_transactions: 1,
            number_of_items_sold: cart.length,
            total_net: total,
            total_tax: tax,
            total_tips: parseInt(tip),
          })
        })
        // let res = await req.json()
        setShowCheckoutScreen(false)
        setCart([])
        window.localStorage.removeItem('cart')

      }
    }
    const handleCheckout = () => {
      createTransaction()
    }

useKey('Enter', handleCheckout)

return (
    <div id="checkout-page">
        <div id="checkout-page-container">
        <RxCross2 id="tip-pop-up-close-btn" onClick={()=> {setShowCheckoutScreen(false)}}/>
            <div className="tap-container">
                <BsChevronUp id="tap-chevron"/>
                <h4>TAP</h4>
            </div>
            <div className="checkout-total-container">
            <h1 className="checkout-page-total">${((calculateCartTotal() + calculateTax())/100).toFixed(2)}</h1>
            <p>+ Tip ${finalTipAmount.toFixed(2)}</p>
            </div>
            <h1 className="checkout-page-instructions">Insert, Tap, or Swipe</h1>
        </div>
        <div className="checkout-page-card-illustration">
        <div className="checkout-page-card-chip-base">
            <div className="first-horizontal-line"></div>
            <div className="second-horizontal-line"></div>
            <div className="top-left-vertical-line"></div>
            <div className="top-right-vertical-line"></div>
            <div className="bottom-left-vertical-line"></div>
            <div className="bottom-right-vertical-line"></div>
        </div>
        </div>
        <div className="checkout-page-shading-box"></div>
        <div className="checkout-page-card-slot"></div>
        
    </div>
)
}

export default CheckoutPage