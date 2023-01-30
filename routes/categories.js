const express = require('express')
const router = express.Router()

const { Category} = require('../models')

//*index for categories (get all categories)
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
//* Get all items that belong to a category by category ID
router.get('/items/:categoryId', async(req, res)=> {
    try {
        let category = await Category.findOne({where: {id: req.params.categoryId}})
        let items = await category.getItems()
        return res.json(items)
    }catch(err){
        console.log(err)
        return res.status(500)
    }
})

//* Get all category names
router.get('/names', async(req, res)=> {
 try{
    let categories = await Category.findAll()
    let names = categories.map(category => {
        return (
            category.name
        )
    })
    return res.json(names)
 } catch(err){
    console.log(err)
    return res.json(err)
 } 
})

//* Create categories
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