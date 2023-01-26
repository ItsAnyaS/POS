const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router()

const { User } = require('../models')

//* Sign in

router.post('/login', async(req,res)=> {
    let {username, password } = req.body
    try{
        let user = await  User.findOne({where: {username}})
        if (user){
            if (user.password === password){
                let token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), data: user.uuid}, 'secret');
                return res.json({
                    authToken: token,
                    country: user.country,
                    state: user.state
                })
            }else {
                return res.json({error: "Incorrect username or password"})
            }
        }else {
            return res.json({error: "There is no user with this username"})
        }
    }catch(err){
        console.log(err)
        return res.json(err).status(500)
    }
})


//* Check if user is signed in

router.get('/:token', async(req, res)=> {
    let token = req.params.token
    try{
        let decodedToken = jwt.verify(token, 'secret')
        if (!decodedToken){
            return res.json({message: "Not valid user"})
        }
        let uuid = decodedToken.data
        let user = await User.findOne({where: {uuid: uuid}})
        if (user){
            return res.json({message: "valid user"}).status(200)
        }else {
            return res.json({message: "not valid user"}).status(400)
        }
    }catch(err){
        console.log(err)
        return res.json(err).status(500)
    }
})

// router.get('/:uuid', async(req, res)=> {
//     token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), data: 'foo'}, 'secret');
//     let decoded = jwt.verify(token, 'secret')
//     console.log(decoded)
// return res.json(token)
// })




module.exports = router