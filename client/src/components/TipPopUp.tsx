import React, {Dispatch, SetStateAction} from "react";
import { RxCross2 } from 'react-icons/rx'
let taxRate = 0
//! Need to change tax rate with each user
let data = window.localStorage.getItem('taxRate')
taxRate = parseFloat(JSON.parse(data || "").tax)/100

const fifteenPercent = 0.15
const eighteenPercent = 0.18
const twentyPercent = 0.20

interface Props {
    setShowTipScreen: Dispatch<SetStateAction<boolean>>,
    cart: ItemObj[],
    submitTip: (tipAmount: number)=> void
}

interface ItemObj {
    id: number,
    name: string,
    photoLink: string,
    price: number,
    categoryId: number
  }

const TipPopUp: React.FC<Props> = ({setShowTipScreen, cart, submitTip}) => {

    const getCartTotal =() => {
        let tax = 0
        let total = 0
        cart.forEach(item => {
            total += item.price
            tax += item.price * taxRate
        })
        return total = (total+ tax)/100
    }



return(
    <div id="tip-pop-up">
        <div id="tip-pop-up-container">
        <RxCross2 id="tip-pop-up-close-btn" onClick={()=> {setShowTipScreen(false)}}/>
            <h1>${getCartTotal().toFixed(2)}</h1>
            <h2>Add a tip?</h2>
            <div className="tip-option-container">
                <div className="tip-option-card" onClick={()=> {submitTip((getCartTotal()*fifteenPercent))}}>
                    <h4>15%</h4>
                    <p>${(getCartTotal()*fifteenPercent).toFixed(2)}</p>
                </div>
                <div className="tip-option-card" onClick={()=> {submitTip((getCartTotal()*eighteenPercent))}}>
                    <h4>18%</h4>
                    <p>${(getCartTotal()*eighteenPercent).toFixed(2)}</p>
                </div>
                <div className="tip-option-card" onClick={()=> {submitTip((getCartTotal()*twentyPercent))}}>
                    <h4>20%</h4>
                    <p>${(getCartTotal()*twentyPercent).toFixed(2)}</p>
                </div>
            </div>
            <div className="other-tip-option">
                <h3>Custom</h3>
            </div>
            <div className="other-tip-option" onClick={()=> {submitTip((getCartTotal()*0))}}>
                <h3>No tip</h3>
            </div>
        </div>
    </div>
)
}

export default TipPopUp