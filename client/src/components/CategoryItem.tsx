import React from "react";
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

interface CategoryObj {
    name: string,
    description: string,
    id: number
}

interface Props {
    category: CategoryObj
}

const CategoryItem: React.FC<Props> = ({category}) => {

    // const [isHighlighted, setIsHightLighted] = useState<boolean>(false)
return (
    <div className="category-item" key={category?.id} >
        <NavLink style={{"color": "rgba(0, 0, 0, 0.711)", "textDecoration": "none"}} to={`/categories/${category?.id}`}>
            <p  >{category?.name}</p>
        </NavLink>
    </div>
)
}

export default CategoryItem