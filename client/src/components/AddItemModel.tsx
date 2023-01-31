import React from "react";
import { useEffect, useState, Dispatch, SetStateAction  } from "react";

interface CategoryObj {
    name: string,
    description: string,
    id: number
}

interface ItemObj {
    id: number,
    name: string,
    photoLink: string,
    price: number,
    categoryId: number
}



interface Props {
    setIsShowingModel: Dispatch<SetStateAction<boolean>>;
    categories: CategoryObj[],
    setItems: Dispatch<SetStateAction<ItemObj[]>>;
}

const AddItemModel: React.FC<Props> = ({setIsShowingModel, categories, setItems}) => {

    const [AddItemForm, setAddItemForm] = useState({categoryId: 1})

    const handleChangeString = (e: React.ChangeEvent<HTMLInputElement>) => {
            setAddItemForm(
                {...AddItemForm,
               [ e.target.name]: e.target.value.toLocaleLowerCase()}
            )
        }


    const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
            setAddItemForm(
                {...AddItemForm,
               [ e.target.name]: parseInt(e.target.value)*100}
            )
        }

        const handleFormSubmit = async(e: React.SyntheticEvent) => {
            e.preventDefault()
            let req = await fetch('/items', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(AddItemForm)
            })
            let res = await req.json()

            if (req.ok){
                setIsShowingModel(false)
                setItems(prev => [...prev, AddItemForm])
            }
        }
    
        console.log(AddItemForm)
        return (
    <div id="add-item-model" onClick={()=> {setIsShowingModel(false)}}>
        <div id="add-item-model-container" onClick={(e)=> {e.stopPropagation()}}>
            <section id="add-item-model-header"><h2>Add Item</h2></section>
            <form  id="add-item-model-form" onSubmit={(e)=> {handleFormSubmit(e)}}>
                <fieldset>
                    <legend>Name</legend>
                    <input type="text" required onChange={(e)=> {handleChangeString(e)}} className="add-item-model-input" name="name" />
                </fieldset>
                <fieldset>
                <legend>Price</legend>
                <input type="number" required onChange={(e)=> {handleChangeNumber(e)}} className="add-item-model-input" name="price" />
                </fieldset>
                <fieldset>
                    <legend>Image</legend>
                    <input type="text" required onChange={(e)=> {handleChangeString(e)}} className="add-item-model-input" name="photoLink" />
                </fieldset>
                <fieldset>
                    <legend>Category</legend>
                    <select name="categoryId" onChange={(e)=> {setAddItemForm({...AddItemForm, [e.target.name]: parseInt(e.target.value)})}}  className="add-item-model-select">
                        {
                            categories.map(category => {
                                return (
                                    <option  value={category?.id}>{category?.name}</option>
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