const express = require('express')
const { sequelize } = require('./models')
const app = express()
app.use(express.json())

const itemRouter = require('./routes/items')
const categoryRouter = require('./routes/categories')
const userRouter = require('./routes/users')
const sessionRouter = require('./routes/sessions')
const transactionRouter = require('./routes/transactions')


app.use('/items', itemRouter)
app.use('/categories', categoryRouter)
app.use('/users', userRouter)
app.use('/sessions', sessionRouter)
app.use('/transactions', transactionRouter)


//! Need to add migration for adding a session id to transactions


app.listen({port: 3000}, async() => {
    console.log('server is up')
    await sequelize.authenticate()
    console.log('database connected')
})