const express = require('express')
const router = express.Router()

const { Item } = require('../models')

//*index for items (get all items)
router.get('/', async(req, res)=> {
    try{
        let items = await Item.findAll()
        return res.json(items)
    }catch(err){
        console.log(err)
        return res.json(err)
    }
})


//* Create items
router.post('/', async(req, res)=> {
    const {name, price, categoryId, photoLink} = req.body
    try{
        let item = await Item.create({name, price, categoryId, photoLink})
        return res.json(item)
    }catch(err){
        console.log(err)
        return res.json(err).status(500)
    }
})

//* Delete item

router.delete('/:id', async(req,res)=> {
    let id = req.params.id
    try{
        let item = await Item.destroy({where: {id: id}})
        if (item){
            return res.json(item)
        }else {
            return res.json({message: "Item doesn't exist"})
        }
    }catch (err){
        console.log(err)
        return res.json(err)
    }
})


module.exports = router