const jwt=require('jsonwebtoken')
const pick=require('lodash/pick')
const authUser=(req,res,next)=>{
    let token=req.headers['authorization']
    if(!token){
        return res.status(401).json({errors:'authentication failed'})
    }
    token=token.split(' ')[1]
    try {
        const tokenData=jwt.verify(token,process.env.JWT_SECRET)
        req.user=pick(tokenData,['id'])
        next()
    } catch (error) {
         res.status(401).json({errors:'authentication failed'})
    }
}
module.exports={
    authUser
}