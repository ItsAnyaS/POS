import React from "react";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useParams } from 'react-router-dom'


interface ItemObj {
    id: number,
    name: string,
    photoLink: string,
    price: number,
    categoryId: number
}

interface Props {
    setCart: Dispatch<SetStateAction<ItemObj[]>>;
}


const ItemsByCategory: React.FC<Props> = ({setCart}) => {
const { id } = useParams()
const [items, setItems] = useState<ItemObj[]>([])

const getItems = async() => {
    let req = await fetch(`http://localhost:3000/categories/items/${id}`)
    let res = await req.json()
    // console.log(res)
    setItems(res)
}

const setLocalCart = (item: ItemObj) => {

    let lsCart = window.localStorage.getItem('cart')
    if (lsCart){
        let parsedCart = JSON.parse(lsCart)
        let newCart = [...parsedCart, item]
        window.localStorage.setItem('cart', JSON.stringify(newCart))
    }
}

useEffect(()=> {
    getItems()
}, [id])

return (
    <div id="item-container" >

{
                items.map(item => {
                    return (
                        <div className="item-card" key={item?.id} onClick={()=> {setCart(prev => [...prev, item]); setLocalCart(item)}}>
                        <img src="https://images.squarespace-cdn.com/content/v1/5d74df302807231bcc6b66c0/1634255918525-9FITTW6D9NXY2R8BBVWA/espresso+shot.jpg" alt="alt" className="item-image" />
                        <div className="item-title">
                          <p>{item?.name}</p>
                        </div>
                    </div>
                    )
                })
            }
    </div>
)
}

export default ItemsByCategory