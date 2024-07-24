const userValidation={
    username:{
        notEmpty:{
            errorMessage:'username is required'
        },
    },
    email:{
        notEmpty:{
            errorMessage:'email is required'
        },
        isEmail:{
            errorMessage:'invalid email format'
        }
    },
    password:{
        notEmpty:{
            errorMessage:'password is required'
        },
        isLength
    }
}