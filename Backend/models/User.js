const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        // required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true,
    },
    additionalDetails:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"Profile",
    },
    courses:[{
        type:mongoose.Schema.ObjectId,
        ref:"Course",
        required:true,
    }],
    image:{
        type:String,
        required:true,
    },
    token:{
        type:String,

    },
    resetPasswordExpires:{
        type:Date,
    },
    courseProgress:[{
        type:mongoose.Schema.ObjectId,
        ref:"CourseProgress",
        required:true,
    }],


});
module.exports = mongoose.model("User",userSchema);