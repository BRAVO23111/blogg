const mongoose = require('mongoose')
const {Schema , model}  = mongoose 
const PostSchema = new Schema({
    // _id:String,
    title :String,
    summary : String,
    content: String,
    cover: String,
},{
    timestamps:true,
})

const Postmodel = model('PostUser' ,PostSchema)

module.exports = Postmodel; 

