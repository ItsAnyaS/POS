import React from "react";
import { useEffect, useState } from "react";

const TransactionPage = () => {

    const getTransactions = async() => {
        let req = await fetch('http://localhost:3000/transactions/b9e56fe2-dced-4e6a-bdfa-facbe01a0bca')
        let res = await req.json()
        console.log(res)
    }

    const testTrans = async() => {
        let req = await fetch('http://localhost:3000/transactions', {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                "number_of_items": 3,
                "items": [
                    {"name": "espresso",
                     "price": 200
                    }
                     ],
                "total_cost": 500,
                "total_tax": 50,
                "total_tip":50,
                "sessionId": 2
            })
        })
        let res = await req.json()
        console.log(res)
    }

    useEffect(()=> {
        getTransactions()
    }, [])

return(
    <div id="transaction-page">
        hello
        <button onClick={()=> {testTrans()}}>test</button>
    </div>
)
}

export default TransactionPage