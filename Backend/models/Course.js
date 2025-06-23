const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    
  courseName:{
    type:String,
    reuired:true,
    trim:true,
   },
   courseDescription:{
    type:String,
    required:true,
    trim:true,
   },
   instructor:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
    trim:true,
   },
   whatYouWillLearn:{
    type:String,
    trim:true,
    required:true,
   },
   courseContent:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section",
    required:true,
   }],
   ratingAndReview:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RatingAndReview",
   },
   price:{
    type:Number,
    required:true,
    trim:true,
   },
   thumbnail:{
    type:String,
    require:true,
   },
   category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
   },
   tag:{
    type:[String],

   },
   studentEnrolled:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        reuired:true,
    }
   ],
   instructions:{
    type:[String],
   },
   status:{
    type:String,
    enum:["Draft", "Published"],
    default:"Draft",
   },


});
module.exports = mongoose.model("Course", courseSchema);