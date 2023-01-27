const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const { Session, User } = require('../models')


const decodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}


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

//* Create a session --> this is used when a user logs into the POS, it will be updated every time a transaction is created and finalized when the user logs out

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

//* Update session each item a transaction is completed
router.patch('/update/:token', async(req, res)=> {
    let { number_of_transactions, total_tips, total_tax, number_of_items_sold, total_net } = req.body
    let uuid = decodeToken(req.params.token).data
    console.log(uuid)
    try {
        if (uuid){
            let user = await User.findOne({where: {uuid: uuid}})
            if (user){
                let session =  await Session.findOne({where: {userId: user.id}, order: [ [ 'updatedAt', 'DESC' ]]})
                if (number_of_transactions){
                    session.update({number_of_transactions: session.number_of_transactions + number_of_transactions})
                }
                if (total_tips){
                    session.update({total_tips: session.total_tips + total_tips})
                }

                if (total_tax){
                    session.update({total_tax: session.total_tax + total_tax})
                }
                if(number_of_items_sold){
                    session.update({number_of_items_sold: session.number_of_items_sold + number_of_items_sold})
                } 
                if (total_net){
                    session.update({total_net: session.total_net + total_net})
                }
                return res.json(session)
            }else {
                return res.json({message: 'No user found'}).status(404)
            }
        }else {
            return res.json({message: 'Error, unable to find user with this id or unable to verify JWT'})
        }
    }catch(err){
        console.log(err)
        res.json({message: 'Error'}).status(500)
    }
})

module.exports = router