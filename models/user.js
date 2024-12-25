const mongoose = require("mongoose")
const mongoseunique = require("mongoose-unique-validator")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {type:String , required: true},
    email : {type:String , required: true , unique:true},
    password : {type:String , required: true , minlength:6},
    image : {type:String , required: true},
    place : {type:String , required: true},
})

userSchema.plugin(mongoseunique)

module.exports = mongoose.model('User', userSchema)