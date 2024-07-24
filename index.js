require('dotenv').config()
const express=require('express')
const cors=require('cors')
const configDB = require('./config/db')
const app=express()
const port=3018
app.use(express.json())
app.use(cors())
configDB()
app.listen(port,()=>{
    console.log('server running on port',port)
})