const mongoose = require('mongoose');

const ratingAndReviewSchema = mongoose.Schema({

        review:{
            type:String,
            required:true,

        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        },
        course:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Course"
        },
        reting:{
            type:Number,
            required:true
        }
        
});
module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);