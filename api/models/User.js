const mongoose = require('mongoose')
const {Schema,model} = mongoose
const userSchema = new mongoose.Schema({
     usename:{type:string,required:true,min:4,unique:true},
     password:{type:string,required:true}
}) 
const Usermodel = mongoose.model('User',userSchema)

module.exports = Usermodel;