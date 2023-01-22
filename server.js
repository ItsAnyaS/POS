const express = require('express')
const { sequelize, Category } = require('./models')
const category = require('./models/category')
const app = express()
app.use(express.json())

const itemRouter = require('./routes/items')
const categoryRouter = require('./routes/categories')


app.use('/items', itemRouter)
app.use('/categories', categoryRouter)



app.listen({port: 3000}, async() => {
    console.log('server is up')
    await sequelize.authenticate()
    console.log('database connected')
})