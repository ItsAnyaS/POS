const express = require('express')
const router = express.Router()

const {User} = require('../models')

router.get('/', async(req,res)=> {
let users = await User.findAll()
return res.json(users)
})

router.post('/', async(req, res)=> {
    const {username, password, country, state} = req.body
    console.log(username)
try{
    let user = await User.create({username, password, country, state})
    res.json(user)
}catch(err){
    console.log(err)
    return res.json(err)
}
})

module.exports = router