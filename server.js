const express = require('express')
const { sequelize } = require('./models')
const app = express()
app.use(express.json())

const itemRouter = require('./routes/items')
const categoryRouter = require('./routes/categories')
const userRouter = require('./routes/users')
const sessionRouter = require('./routes/sessions')


app.use('/items', itemRouter)
app.use('/categories', categoryRouter)
app.use('/users', userRouter)
app.use('/sessions', sessionRouter)



app.listen({port: 3000}, async() => {
    console.log('server is up')
    await sequelize.authenticate()
    console.log('database connected')
})