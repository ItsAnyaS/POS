const express = require('express')
const { sequelize, Category } = require('./models')
const category = require('./models/category')
const app = express()
app.use(express.json())


app.get('/categories', async(req, res)=> {
    try{
        let categories = await Category.findAll()
        return res.json(categories)
    }catch(err){
        console.log(err)
        return res.status(500)
        // res.send('hi')
    }
})

app.post('/categories', async(req,res) => {
    const {name, description} = req.body
    try{
        let category = await Category.create({name, description})
        return res.json(category)
    }catch(err){
        console.log(err)
        return res.json(err)
    }
})



app.listen({port: 3000}, async() => {
    console.log('server is up')
    await sequelize.authenticate()
    console.log('database connected')
})