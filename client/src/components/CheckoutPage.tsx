import React, { useEffect, useRef, Dispatch, SetStateAction} from "react";
import {BsChevronUp} from 'react-icons/bs'


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

const handleCheckout = () => {
  setShowCheckoutScreen(false)
  setCart([])
  window.localStorage.removeItem('cart')
}

useKey('Enter', handleCheckout)

return (
    <div id="checkout-page">
        <div id="checkout-page-container">
            <div className="tap-container">
                <BsChevronUp id="tap-chevron"/>
                <h4>TAP</h4>
            </div>
            <div className="checkout-total-container">
            <h1 className="checkout-page-total">${(calculateCartTotal()/100).toFixed(2)}</h1>
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