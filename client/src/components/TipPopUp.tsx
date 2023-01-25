import React, {Dispatch, SetStateAction} from "react";
import { RxCross2 } from 'react-icons/rx'

interface Props {
    setShowTipScreen: Dispatch<SetStateAction<boolean>>;
}

const TipPopUp: React.FC<Props> = ({setShowTipScreen}) => {
return(
    <div id="tip-pop-up">
        <div id="tip-pop-up-container">
        <RxCross2 id="tip-pop-up-close-btn" onClick={()=> {setShowTipScreen(false)}}/>
            <h1>$10.12</h1>
            <h2>Add a tip?</h2>
            <div className="tip-option-container">
                <div className="tip-option-card">
                    <h4>15%</h4>
                    <p>$1.23</p>
                </div>
                <div className="tip-option-card">
                    <h4>18%</h4>
                    <p>$1.23</p>
                </div>
                <div className="tip-option-card">
                    <h4>20%</h4>
                    <p>$1.23</p>
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