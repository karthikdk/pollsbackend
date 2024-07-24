const mongoose=require('mongoose')

const configDB=async()=>{
    try {
        const url=process.env.DB_URL||'mongodb://127.0.0.1:27017'
        const dbName=process.env.DB_NAME='pollsapp24'
        const db=await mongoose.connect(`${url}/${dbName}`)
        console.log('connected to db')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports=configDB