import React, {Dispatch, SetStateAction, useEffect} from "react";
import { RxCross2 } from 'react-icons/rx'

interface Props {
    setShowTipScreen: Dispatch<SetStateAction<boolean>>,
    cart: ItemObj[]
}

interface ItemObj {
    id: number,
    name: string,
    photoLink: string,
    price: number,
    categoryId: number
  }

const TipPopUp: React.FC<Props> = ({setShowTipScreen, cart}) => {

    const getCartTotal =() => {
        let total = 0
        cart.forEach(item => {
            total += item.price
        })
        return total = total/100
    }


return(
    <div id="tip-pop-up">
        <div id="tip-pop-up-container">
        <RxCross2 id="tip-pop-up-close-btn" onClick={()=> {setShowTipScreen(false)}}/>
            <h1>${getCartTotal().toFixed(2)}</h1>
            <h2>Add a tip?</h2>
            <div className="tip-option-container">
                <div className="tip-option-card">
                    <h4>15%</h4>
                    <p>${(getCartTotal()*1.15).toFixed(2)}</p>
                </div>
                <div className="tip-option-card">
                    <h4>18%</h4>
                    <p>${(getCartTotal()*1.18).toFixed(2)}</p>
                </div>
                <div className="tip-option-card">
                    <h4>20%</h4>
                    <p>${(getCartTotal()*1.20).toFixed(2)}</p>
                </div>
            </div>
            <div className="other-tip-option">
                <h3>Custom</h3>
            </div>
            <div className="other-tip-option">
                <h3>No tip</h3>
            </div>
        </div>
    </div>
)
}

export default TipPopUp