import React from "react";
import { useEffect, useState } from "react";

const CategorySelectionBar = () => {

    const [categories, setCategories] = useState<string[]>([])

    const getCategories = async() => {
        let req = await fetch('http://localhost:3000/categories/names')
        let res = await req.json()
        setCategories(res)
    }

    useEffect(()=> {
        getCategories()
   }, [])

    return (
        <section id="category-selection">
             <div className="category-item">
                        <p>All</p>
                        </div>
            {
                categories.map(category => {
                    return (
                        <div className="category-item">
                        <p>{category}</p>
                        </div>

                    )
                })
            }
      </section>
    )
}

export default CategorySelectionBar