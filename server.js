const express = require('express')
const jwt = require('jsonwebtoken');
// const env = require('dotenv')
const { sequelize } = require('./models')
const PORT = process.env.PORT || 3000
const cors = require('cors')
const app = express()
const path = require('path')
app.use(express.json())
app.use(cors())

console.log(process.env.NODE_ENV)
app.use(express.static(path.join(__dirname, "client/build")))
if (process.env.NODE_ENV === 'production'){
}


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
app.use('/transactions/api', transactionRouter)
app.use('/auth', authRouter)

app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})



app.listen(PORT, async() => {
    console.log('server is up')
    await sequelize.authenticate()
    console.log('database connected')
})