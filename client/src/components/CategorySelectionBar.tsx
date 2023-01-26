import React, { Dispatch, SetStateAction } from "react";
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

    const getCategories = async() => {
        let req = await fetch('http://localhost:3000/categories')
        let res = await req.json()
        setCategories(res)
    }

    const logoutUser =() => {
        Cookies.remove('auth-token')
        setIsLoggedIn(false)
      }

    useEffect(()=> {
        getCategories()
   }, [])

    return (
        <section id="category-selection">
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
                <div className="dd-logout" onClick={()=> {logoutUser()}}>LOGOUT</div>
            </div>}
            </div>
           { isShowingModel && <AddItemModel categories={categories} setIsShowingModel={setIsShowingModel}/>}
      </section>
    )
}

export default CategorySelectionBar