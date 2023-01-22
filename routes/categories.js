const express = require('express')
const router = express.Router()

const { Category} = require('../models')

//index for categories
router.get('/', async(req, res)=> {
    try{
        let categories = await Category.findAll()
        return res.json(categories)
    }catch(err){
        console.log(err)
        return res.status(500)
        // res.send('hi')
    }
})


//create for categories
router.post('/', async(req,res) => {
    const {name, description} = req.body
    try{
        let category = await Category.create({name, description})
        return res.json(category)
    }catch(err){
        console.log(err)
        return res.json(err)
    }
})

module.exports = router