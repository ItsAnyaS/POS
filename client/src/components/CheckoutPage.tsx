import React from "react";
import {BsChevronUp} from 'react-icons/bs'

const CheckoutPage = () => {
return (
    <div id="checkout-page">
        <div id="checkout-page-container">
            <div className="tap-container">
                <BsChevronUp id="tap-chevron"/>
                <h4>TAP</h4>
            </div>
            <h1 className="checkout-page-total">$55.20</h1>
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