const express = require('express')
const app = express()
const connectMongo = require('./db')
const router = require('./Router/router')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api',router)
connectMongo()

app.listen(3100,()=>{
 console.log('server is stening on port 3100')
})