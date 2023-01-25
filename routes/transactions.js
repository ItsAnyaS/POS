const express = require('express')
const router = express.Router()

const { Transaction, User, Session, Item } = require('../models') 

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
    const {number_of_items, items, total_cost, total_tax, total_tip, sessionId} = req.body
    try{
        let transaction = await Transaction.create({number_of_items, items, total_cost, total_tax, total_tip, sessionId})
        return res.json(transaction)
    }catch(err){
        console.log(err)
        return res.json(err).status(500)
    }
})

//* Get all transactions that belong to a user with user's uuid
//! This method only shows the transactions from the most recent session
router.get('/:uuid', async(req, res)=> {
    try{
        let user = await User.findOne({uuid: req.params.uuid})
        if (user){
            let session =  await Session.findOne({where: {userId: user.id}, order: [ [ 'updatedAt', 'DESC' ]]})
            let transactions = await session.getTransactions()
            return res.json(transactions)
        }
    }catch(err){
        console.log(err)
        return res.json(err)
    }
})


router.delete('/:id', async(req, res)=> {
    let transaction = await Transaction.findOne({where: {id: req.params.id}})
    Transaction.destroy({where: {id: transaction.id}})
    return res.json(transaction)
})

module.exports = router