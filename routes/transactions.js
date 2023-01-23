const express = require('express')
const router = express.Router()

const { Transaction } = require('../models') 

//* Index (Get all transactions)

router.get('/', async(req, res)=> {
    try {
        let transactions = await Transaction.findAll()
        return res.json(transactions)
    }catch(err){
        console.log(err)
        return res.status(500)
    }
})

//* Create a transaction, this will be used when a transaction is completed in the client side
router.post('/', async(req,res)=> {
    const {number_of_items, items, total_cost, total_tax, total_tip} = req.body
    try{
        let transaction = await Transaction.create({number_of_items, items, total_cost, total_tax, total_tip})
        return res.json(transaction)
    }catch(err){
        console.log(err)
        return res.status(500)
    }
})


module.exports = router