const express = require('express')
const router = express.Router()

const { Session } = require('../models')

//*Session index

router.get('/', async(req,res)=>{
    try{
        let sessions = await Session.findAll()
        return res.json(sessions)
    }catch(err){
        console.log(err)
        return res.json(err)
    }
})

//*Session get a single session by id

router.get('/:id',async(req,res)=> {
    try{
        let session = await Session.findOne({where: {id: req.params.id}})
        return res.json(session)
    } catch(err){
        console.log(err)
        return res.json(err)
    }
})

//*Get the user that belogns to this session by the session ID

router.get('/user/:sessionId', async(req,res)=> {
    try{
        let session = await Session.findOne({where: {id: req.params.sessionId}})
        let user = await session.getUser()
        return res.json(user)
    }catch(err){
        console.log(err)
        return res.json(err)

    }
})

//* Create a session --> this is used when a user logs into the POS, it will be updated everytime a transaction is created and finalized when the user logs out

router.post('/', async(req,res)=> {
    let {number_of_transactions, total_tips, total_tax, number_of_items_sold, total_net, userId} = req.body
    try{
        let session = await Session.create({number_of_transactions, total_tips, total_tax, number_of_items_sold, total_net, userId})
        return res.json(session)
    }catch(err){
        console.log(err)
        return res.json(err)
    }
})

//* Shows All transactions for a session using session id

router.get('/transactions/:sessionId', async(req, res)=> {
    try{
        let session = await  Session.findOne({where: {id: req.params.sessionId}})
        let transactions = await session.getTransactions()
        return res.json(transactions)
    }catch(err){
        console.log(err)
        return res.json(err).status(500)
    }
})

module.exports = router