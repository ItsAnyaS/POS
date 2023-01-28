import React from "react";
import { useEffect, useState, Dispatch, SetStateAction  } from "react";
import { MdRemoveCircle} from 'react-icons/md'

interface ItemObj {
    id: number,
    name: string,
    photoLink: string,
    price: number,
    categoryId: number
}
interface Props {
    setCart: Dispatch<SetStateAction<ItemObj[]>>;
    setIsDeletingItems: Dispatch<SetStateAction<boolean>>,
    isDeletingItems: boolean

}

const Main: React.FC<Props> = ({setCart, setIsDeletingItems, isDeletingItems}) => {



const [items, setItems] = useState<ItemObj[]>([])

    const getItems = async() => {
        try{
            let req = await fetch('/items')
            let res = await req.json()
            setItems(res)
        }catch(err){
            console.log(err)
        }
    }

    const setLocalCart = (item: ItemObj) => {

        let lsCart = window.localStorage.getItem('cart')
        if (lsCart){
            let parsedCart = JSON.parse(lsCart)
            let newCart = [...parsedCart, item]
            window.localStorage.setItem('cart', JSON.stringify(newCart))
        }
    }

    const deleteItem = async(itemId: number, e: React.SyntheticEvent) => {
        e.stopPropagation()
        console.log(itemId)
        let req = await fetch(`/items/${itemId}`, {
            method: "DELETE",
            headers: {"Content-type": "application/json"}
        })
        let res = await req.json()
        if (req.ok){
            let alreadyRemoved = false
            let filteredItems = items.filter(item => {
                if (item.id === itemId && !alreadyRemoved){
                    alreadyRemoved = true
                }else {
                    return item
                }
            })
            setItems(filteredItems)
        }
    }

    useEffect(()=> {
        getItems()
    }, [])

    
    return (
        <main>
        <div id="item-container" onClick={()=> {setIsDeletingItems(false)}}>

        {
                items.map(item => {
                    return (
                        <div className="item-card" key={item?.id} onClick={()=> {setCart(prev => [...prev, item]); setLocalCart(item)}}>
                        <img src="https://images.squarespace-cdn.com/content/v1/5d74df302807231bcc6b66c0/1634255918525-9FITTW6D9NXY2R8BBVWA/espresso+shot.jpg" alt="alt" className="item-image" />
                        <div className="item-title">
                          <p>{item?.name}</p>
                          { isDeletingItems && <div className="item-card-delete-btn" onClick={(e)=> {deleteItem(item.id, e)}}>{<MdRemoveCircle/>}</div>}
                        </div>
                    </div>
                    )
                })
            }
        </div>
        </main>
    )
}

export default Main