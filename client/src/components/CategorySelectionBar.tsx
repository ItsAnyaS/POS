import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'
import CategoryItem from './CategoryItem'

interface CategoryObj {
    name: string,
    description: string,
    id: number
}

const CategorySelectionBar = () => {

    const [categories, setCategories] = useState<CategoryObj[]>([])
    const [currentlyHighlighted, setCurrentlyHighlighted] = useState(true)

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
      </section>
    )
}

export default CategorySelectionBar