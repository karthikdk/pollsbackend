require('dotenv').config()
const express=require('express')
const cors=require('cors')
const configDB = require('./config/db')
const {checkSchema}=require('express-validator')
const usersController = require('./app/controllers/users-controller')
const userValidationSchema = require('./app/helpers/user-validation')
const app=express()
const port=3018
app.use(express.json())
app.use(cors())
configDB()

app.post('/auth/register', checkSchema(userValidationSchema), usersController.register)
app.listen(port,()=>{
    console.log('server running on port',port)
})