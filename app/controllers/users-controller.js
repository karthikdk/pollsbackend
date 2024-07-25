const User = require("../models/user");
const pick=require('lodash/pick')
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

module.exports=usersController
