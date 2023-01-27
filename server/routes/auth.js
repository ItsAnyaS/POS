const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const { User } = require('../models')


//* Create token with 24 expiry
const signToken = (user) => {
    return jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), data: user.uuid}, process.env.JWT_SECRET_KEY);
}

const decodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

// const encryptPassword =(hash) => {
//     bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//         // Store hash in your password DB.
//         console.log(hash)
//     });
// }

//* Sign in

router.post('/login', async(req,res)=> {
    let {username, password } = req.body
    // console.log(process.env.JWT_SECRET_KEY)
    try{
        let user = await  User.findOne({where: {username}})
        if (user){
            let decryptedPassword = await bcrypt.compare(password, user.password)
            if (decryptedPassword){
                let token = signToken(user)
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
        let decodedToken = decodeToken(token)
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


//* Create user / sign up
router.post('/signup', async(req,res) => {
    let { username, password, country, state} = req.body
    try {
        let userExists = await User.findOne({where: {username}})
        if (!userExists){
        let encryptedPassword = await bcrypt.hash(password, 10)
        let user = await User.create({username, password: encryptedPassword, country, state})
            if (user){
                return res.json({message: 'account successfully created', authToken: signToken(user)})
            }else {
                return res.json({message: 'Bad request'}).status(400)
            }
        }else {
            return res.json({message: "A user with that name already exists"}).status(400)
        }
    }catch(err){
        console.log(err)
        return res.json(err)
    }
})




module.exports = router