import React, {Dispatch, SetStateAction, useState} from "react";
import '../styles/Keypad.css'
import { BsArrowReturnRight} from 'react-icons/bs'

interface ItemObj {
    id: number,
    name: string,
    photoLink: string,
    price: number,
    categoryId: number
}

interface Props {
setCart: Dispatch<SetStateAction<ItemObj[]>>
}

const Keypad: React.FC<Props> = ({setCart}) => {

    const [customAmountToBeAdded, setCustomAmountToBeAdded] = useState<string>('000')

    const appendNumberToAmount = (number: number) => {
        let arr = customAmountToBeAdded.split('')
        if (arr[0] === '0'){
            arr.shift()
        }
        let wholeValue = arr.join('') + number.toString()
        let sp = wholeValue.split('')
        if (!sp.includes('.')){
            sp.splice(1,0, '.')
        }else {
            let indexOfPeriod = sp.indexOf('.')
            sp.splice(indexOfPeriod, 1)
            sp.splice(indexOfPeriod+1, 0, '.')
        }
        setCustomAmountToBeAdded(sp.join(''))
    }


    const setLocalCart = (item: ItemObj) => {

        let lsCart = window.localStorage.getItem('cart')
        if (lsCart){
            let parsedCart = JSON.parse(lsCart)
            let newCart = [...parsedCart, item]
            window.localStorage.setItem('cart', JSON.stringify(newCart))
        }
        setCart(prev=> [...prev, item])
    }

return (
    <div id="keypad">
        <div id="keypad-container">
            <form id="keypad-form">
                <h1>${parseFloat(customAmountToBeAdded)=== 0? '0.00': customAmountToBeAdded}</h1>
                <div id="keypad-number-container">
                    <div className="keypad-number-card" onClick={()=> {appendNumberToAmount(1)}}><p>1</p></div>
                    <div className="keypad-number-card" onClick={()=> {appendNumberToAmount(2)}}><p>2</p></div>
                    <div className="keypad-number-card" onClick={()=> {appendNumberToAmount(3)}}><p>3</p></div>
                    <div className="keypad-number-card" onClick={()=> {appendNumberToAmount(4)}}><p>4</p></div>
                    <div className="keypad-number-card" onClick={()=> {appendNumberToAmount(5)}}><p>5</p></div>
                    <div className="keypad-number-card" onClick={()=> {appendNumberToAmount(6)}}><p>6</p></div>
                    <div className="keypad-number-card" onClick={()=> {appendNumberToAmount(7)}}><p>7</p></div>
                    <div className="keypad-number-card" onClick={()=> {appendNumberToAmount(8)}}><p>8</p></div>
                    <div className="keypad-number-card" onClick={()=> {appendNumberToAmount(9)}}><p>9</p></div>
                    <div className="keypad-number-card" onClick={()=> {setCustomAmountToBeAdded('000')}}><p>C</p></div>
                    <div className="keypad-number-card" onClick={()=> {appendNumberToAmount(0)}}><p>0</p></div>
                    <div className="keypad-number-card" onClick={()=> { console.log() ;setLocalCart({id: 1, price: parseFloat(customAmountToBeAdded)*100, name: 'custom item', photoLink: 'https://static.thenounproject.com/png/1554489-200.png', categoryId: 1})}}><p><BsArrowReturnRight/></p></div>
                </div>
            </form>
        </div>
    </div>
)
}

export default Keypad