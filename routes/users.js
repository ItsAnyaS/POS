const express = require('express')
const router = express.Router()

const { User } = require('../models')

//* User index (get all users)

// router.get('/', async(req,res)=> {
//     try {
//         let users = await User.findAll()
//         return res.json(users)
//     }catch(err){
//         console.log(err)
//         return res.status(500)
//     }
// })

//* Get a user by id

router.get('/:id', async(req,res)=> {
    try{
        let user = await User.findOne({where: {uuid: req.params.id}})
        return res.json(user)
    }catch(err){
        console.log(err)
        return res.json(err)
    }
})

//*  Create a user
    
router.post('/', async(req, res)=> {
    const {username, password, country, state} = req.body
    try{
        let user = await User.create({username, password, country, state})
        res.json(user)
    }catch(err){
        console.log(err)
        return res.json(err)
    }
})

//* Get a session based on a user ID

router.get('/session/:userId', async(req, res)=> {
    try{
        let user = await User.findOne({where: {uuid: req.params.userId}})
        let sessions = await user.getSessions()
        return res.json(sessions)
    }catch(err){
        console.log(err)
        return res.json(err)
    }
})

module.exports = router