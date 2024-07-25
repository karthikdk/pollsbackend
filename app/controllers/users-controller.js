const User = require("../models/user");
const pick=require('lodash/pick')
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
        await user.save()
        res.json({
            message:'user registered successfully'
        })
    } catch (error) {
        res.json(error)
    }
}

module.exports=usersController
