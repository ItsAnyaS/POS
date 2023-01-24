import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'
import CategoryItem from './CategoryItem'
import { BsThreeDots} from 'react-icons/bs'
import AddItemModel from './AddItemModel'

interface CategoryObj {
    name: string,
    description: string,
    id: number
}

const CategorySelectionBar = () => {

    const [categories, setCategories] = useState<CategoryObj[]>([])
    const [isShowingModel, setIsShowingModel] = useState<boolean>(false)

    const getCategories = async() => {
        let req = await fetch('http://localhost:3000/categories')
        let res = await req.json()
        setCategories(res)
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
            <BsThreeDots id="category-menu-icon" onClick={()=> {setIsShowingModel(true)}}/>
           { isShowingModel && <AddItemModel categories={categories} setIsShowingModel={setIsShowingModel}/>}
      </section>
    )
}

export default CategorySelectionBar