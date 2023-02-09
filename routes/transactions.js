const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'this is the secret key'


const decodeToken = (token) => {
    return jwt.verify(token, JWT_SECRET_KEY)
}

const { Transaction, User, Session } = require('../models') 

//* Index (Get all transactions)

// router.get('/', async(req, res)=> {
//     try {
//         let transactions = await Transaction.findAll()
//         return res.json(transactions)
//     }catch(err){
//         console.log(err)
//         return res.status(500)
//     }
// })

//* Create a transaction, this will be used when a transaction is completed in the client side
router.post('/', async(req,res)=> {
    try{
        const {number_of_items, items, total_cost, total_tax, total_tip, authToken} = req.body
        let uuid = decodeToken(authToken).data
        let user = await User.findOne({where: {uuid: uuid}})
        let session =  await Session.findOne({where: {userId: user.id}, order: [ [ 'updatedAt', 'DESC' ]]})
        let transaction = await Transaction.create({number_of_items, items, total_cost, total_tax, total_tip, sessionId: session.id})
        return res.json(transaction)
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
})

//* Get all transactions that belong to a user with user's uuid
//! This method only shows the transactions from the most recent session
router.get('/:uuid', async(req, res)=> {
    let uuid = decodeToken(req.params.uuid).data
    // console.log(uuid)
    try{
        let user = await User.findOne({where: {uuid: uuid}})
        if (user){
            let session =  await Session.findOne({where: {userId: user.id}, order: [ [ 'updatedAt', 'DESC' ]]})

            let transactions = await session.getTransactions({ order: [ [ 'updatedAt', 'DESC' ]]})
            return res.json(transactions)
        }
    }catch(err){
        console.log(err)
        return res.json({message: 'Error'})
    }
})


router.delete('/:id', async(req, res)=> {
    let transaction = await Transaction.findOne({where: {id: req.params.id}})
    Transaction.destroy({where: {id: transaction.id}})
    return res.json(transaction)
})

module.exports = router