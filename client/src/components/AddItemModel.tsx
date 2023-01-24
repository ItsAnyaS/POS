import React from "react";
import { useEffect, useState, Dispatch, SetStateAction  } from "react";

interface CategoryObj {
    name: string,
    description: string,
    id: number
}

interface Props {
    setIsShowingModel: Dispatch<SetStateAction<boolean>>;
    categories: CategoryObj[]
}

const AddItemModel: React.FC<Props> = ({setIsShowingModel, categories}) => {
return (
    <div id="add-item-model" onClick={()=> {setIsShowingModel(false)}}>
        <div id="add-item-model-container" onClick={(e)=> {e.stopPropagation()}}>
            <section id="add-item-model-header"><h2>Add Item</h2></section>
            <form  id="add-item-model-form">
                <fieldset>
                    <legend>Name</legend>
                    <input type="text" className="add-item-model-input" name="name" />
                </fieldset>
                <fieldset>
                <legend>Price</legend>
                <input type="text" className="add-item-model-input" name="price" />
                </fieldset>
                <fieldset>
                    <legend>Image</legend>
                    <input type="text" className="add-item-model-input" name="photoLink" />
                </fieldset>
                <fieldset>
                    <legend>Category</legend>
                    <select name="category" id="" className="add-item-model-select">
                        {
                            categories.map(category => {
                                return (
                                    <option value={category?.id}>{category?.name}</option>
                                )
                            })
                        }
                    </select>
                </fieldset>

                <button id="add-new-item-btn">Save</button>
            </form>
        </div>
    </div>
)
}

export default AddItemModel