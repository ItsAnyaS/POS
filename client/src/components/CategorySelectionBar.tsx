import React, { Dispatch, SetStateAction } from "react";
import '../styles/CategorySelectionBar.css'
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'
import CategoryItem from './CategoryItem'
import { BsThreeDots} from 'react-icons/bs'
import AddItemModel from './AddItemModel'
import Cookies from 'js-cookie'

interface CategoryObj {
    name: string,
    description: string,
    id: number
}

interface Props {
    setIsShowingCustomCatMenu: Dispatch<SetStateAction<boolean>>,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
    isShowingCustomCatMenu: boolean
}

const CategorySelectionBar: React.FC<Props> = ({setIsShowingCustomCatMenu,isShowingCustomCatMenu, setIsLoggedIn}) => {

    const [categories, setCategories] = useState<CategoryObj[]>([])
    const [isShowingModel, setIsShowingModel] = useState<boolean>(false)
    const [newCategory, setNewCategory] = useState({name: '', description: ''})
    const [isShowingNewCategoryModel, setIsShowingNewCategoryModel] = useState<boolean>(false)

    const getCategories = async() => {
        let req = await fetch('/categories')
        let res = await req.json()
        setCategories(res)
    }

    const logoutUser =() => {
        Cookies.remove('auth-token')
        setIsLoggedIn(false)
        window.localStorage.removeItem('taxRate')
      }

      const addCategory = async() => {
            let req = await fetch('/categories', {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(newCategory)
            })
            let res = await req.json()
            if (req.ok){
                setCategories([...categories, res])
            }
      }

      const handleCategoryInput = (name: string, value: string) => {
        name = name.toLocaleLowerCase()
        value = value.toLocaleLowerCase()
            setNewCategory({...newCategory, [name]: value})
      }

      const handleAddCategoryFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        addCategory()
      }

    useEffect(()=> {
        getCategories()
   }, [])
    return (
        <section id="category-selection">
             <div className="category-item">
                <NavLink to='/keypad' style={{"color": "rgba(0, 0, 0, 0.711)", "textDecoration": "none"}}>
                        <p >Keypad</p>
                        </NavLink>
                        </div>
             <div className="category-item">
                <NavLink to='/' style={{"color": "rgba(0, 0, 0, 0.711)", "textDecoration": "none"}}>
                        <p >All</p>
                        </NavLink>
                        </div>
            {
            categories.map(category => {
                    return (
                        <CategoryItem category={category}/>
                    )
                })
            }
            <div className="category-dd-container">
            <BsThreeDots id="category-menu-icon" onClick={(e)=> {e.stopPropagation();setIsShowingCustomCatMenu(true)}}/>
           { isShowingCustomCatMenu && <div className="custom-category-menu-drop-down">
                <div className="dd-add-new-item" onClick={()=> {setIsShowingCustomCatMenu(false); setIsShowingModel(true)}}>Add Item</div>
                <div onClick={()=> {setIsShowingNewCategoryModel(true)}}>Add Category</div>
                <div className="dd-logout" onClick={()=> {logoutUser()}}>LOGOUT</div>
            </div>}
            </div>
           { isShowingModel && <AddItemModel categories={categories} setIsShowingModel={setIsShowingModel}/>}
          {isShowingNewCategoryModel && <div id="add-category-model" onClick={()=> {setIsShowingNewCategoryModel(false)}}>
                <div id="add-category-model-container" onClick={(e)=> {e.stopPropagation()}}>
                    <form id="add-category-form" onSubmit={(e)=> {handleAddCategoryFormSubmit(e)}}>
                        <h2>Add category</h2>
                        <input type="text" onChange={(e)=> {handleCategoryInput(e.target.name, e.target.value)}}  placeholder="Category name" name="name" />
                        <input type="text" onChange={(e)=> {handleCategoryInput(e.target.name, e.target.value)}} name="description" placeholder="Category description" />
                        <button>Add Category</button>
                    </form>
                </div>
           </div>}
      </section>
    )
}

export default CategorySelectionBar