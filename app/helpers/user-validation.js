const User = require("../models/user")


const usernameSchema={
    notEmpty:{
        errorMessage:'username is required'
    }
}

const passwordSchema={
    notEmpty:{
        errorMessage:'password is required'
    },
    isLength:{
        options:{
            min:8,max:128
        },
        errorMessage:'password should be between 8 to 128 chars'
    }
}
const emailRegisteredSchema={
    notEmpty:{
        errorMessage:'email is required'
    },
    isEmail:{
        errorMessage:'invalid email format'
    },
    custom:{
        options:async(value)=>{
            const user=await User.findOne({email:value})
            if(user){
                throw new Error('email already registered')
            }else{
                return true
            }
        }
    }
}
const emailLoginSchema={
    notEmpty:{
        errorMessage:'email is required'
    },
    isEmail:{
        errorMessage:'invalid email format'
    },
}
const userRegistrationValidationSchema={
    username:usernameSchema,
    email:emailRegisteredSchema,
    password:passwordSchema
}
const userLoginValidationSchema={
    email:emailLoginSchema,
    password:passwordSchema
}
module.exports={
    userRegistrationValidationSchema,
    userLoginValidationSchema
}