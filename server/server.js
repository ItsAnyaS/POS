const express = require('express')
const jwt = require('jsonwebtoken');
const { sequelize } = require('./models')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())


const itemRouter = require('./routes/items')
const categoryRouter = require('./routes/categories')
const userRouter = require('./routes/users')
const sessionRouter = require('./routes/sessions')
const transactionRouter = require('./routes/transactions')
const authRouter = require('./routes/auth')


app.use('/items', itemRouter)
app.use('/categories', categoryRouter)
app.use('/users', userRouter)
app.use('/sessions', sessionRouter)
app.use('/transactions', transactionRouter)
app.use('/auth', authRouter)



app.listen({port: 3000}, async() => {
    console.log('server is up')
    await sequelize.authenticate()
    console.log('database connected')
})