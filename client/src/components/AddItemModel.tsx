import React from "react";
import { useEffect, useState, Dispatch, SetStateAction  } from "react";

interface Props {
    setIsShowingModel: Dispatch<SetStateAction<boolean>>;
}

const AddItemModel: React.FC<Props> = ({setIsShowingModel}) => {
return (
    <div id="add-item-model" onClick={()=> {setIsShowingModel(false)}}>
        <div id="add-item-model-container" onClick={(e)=> {e.stopPropagation()}}>
        hello
        </div>
    </div>
)
}

export default AddItemModel