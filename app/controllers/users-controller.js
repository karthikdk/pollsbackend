const User = require("../models/user");
const usersController={}

usersController.register=async(req,res)=>{
    const body=req.body
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
