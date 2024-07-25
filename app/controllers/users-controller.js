const User = require("../models/user");
const pick=require('lodash/pick')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const {validationResult}=require('express-validator')

const usersController={}

usersController.register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=pick(req.body,['username','email','password'])

    try {
        const user=new User(body)
        const salt=await bcryptjs.genSalt()
        const hashedPassword=await bcryptjs.hash(user.password,salt)
        user.password=hashedPassword
        await user.save()
        res.json({
            message:'user registered successfully',
            user
        })
    } catch (error) {
        res.json(error)
    }
}

usersController.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=pick(req.body,['email','password'])  
    try {
        const user=await User.findOne({email:body.email})
        if(!user){
            return res.status(404).json({errors:'invalid email/password'})
        }
        const result=await bcryptjs.compare(body.password,user.password)
        if(!result){
            return res.status(404).json({errors:'invalid email/password'})
        }
        const tokenData={id:user._id}
        const token=jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'7d'})
        res.json({token:`Bearer ${token}`})

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports=usersController
