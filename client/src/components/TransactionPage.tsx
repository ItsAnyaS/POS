import React from "react";
import { useEffect, useState } from "react";

interface ItemObj {
    id: number,
    name: string,
    photoLink: string,
    price: number,
    categoryId: number
}

interface TransactionObj {
    id: number,
    items: ItemObj[],
    number_of_items: number,
    sessionId: number,
    total_cost: number,
    total_tip: number,
    total_tax: number,
    updatedAt: string
}

const TransactionPage = () => {

    const [transactions, setTransactions] = useState<TransactionObj[]>([])

    const getTransactions = async() => {
        let req = await fetch('http://localhost:3000/transactions/b9e56fe2-dced-4e6a-bdfa-facbe01a0bca')
        let res = await req.json()
        console.log(res)
        setTransactions(res)
    }

    useEffect(()=> {
        getTransactions()
    }, [])

return(
    <div id="transaction-page">
        <div id="transaction-page-header">
            <div className="transaction-header-box">Amount</div>
            <div className="transaction-header-box">Date</div>
            <div className="transaction-header-box">Number of items</div>
        </div>
        <div id="transaction-container">
            {
                transactions.map(transaction => {
return (
                    <div className="transaction-card">
                        <p>${((transaction.total_cost)/100).toFixed(2)}</p>
                        <p>{new Date(transaction.updatedAt).toLocaleDateString('en-us', { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</p>
                        <p>{transaction.number_of_items}</p>                
                    </div>
)
                    })
            }
        </div>
    </div>
)
}

export default TransactionPage