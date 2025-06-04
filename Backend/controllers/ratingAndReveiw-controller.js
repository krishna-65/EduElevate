const User = require('../models/User');
const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');

//create 
exports.createRatingAndReview = async (req, res)=>{
    //take all data from body
    const {rating, review, courseId} = req.body;
    const userId = req.user.id;

    //validate data
    if(!rating ||!review ||!courseId){
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
        });
    }

    //check user is enrolled
    let course;
    try{
        course = await Course.findOne({_id:courseId, 
            studentEnrolled:{$elemMatch:{$eq:userId}},
        })
        if(!course){
            return res.status(404).json({
                success: false,
                message: 'Student is not enrolled in this course',
            });
        }
        //check if user has already reviewed this course
        const existingReview = await RatingAndReview.findOne({user: userId, course: courseId});
        if(existingReview){
            return res.status(403).json({
                success: false,
                message: 'Student  has already reviewed this course',
            });
        }

        //create Rating And Reveiw
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            user:userId,
            course:courseId
        })

        //find user and updated
        await Course.findByIdAndUpdate({_id:courseId}, { $push:{ratingAndReview: ratingReview._id}}, {new:true})
        return res.status(200).json({
            success: true,
            message: 'Rating and review created successfully',
            ratingReview,
        })

        
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server Error, while creating rating and review',
            error: error.message,
        });
    }


}

exports.getAverageRating = async(req,res)=>{
    //get couse id
    const courseId = req.body.courseId;

    let rating;
    //find  average rating
    try{
         const result  = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(String(courseId)),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
         ])
         
         if(result.length>0){
            return res.status(200).json({
                success: true,
                message: 'Average rating fetched successfully',
                averageRating:result[0].averageRating,
             });
         }

         //if no rating/reveiw exist
         return res.status(404).json({
             success: false,
             message: 'Average Rating is 0, no rating given till now',
             averageRating: 0,
         });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server Error, while getting average rating',
            error: error.message,
        });
    }

}

//get all rating/Reveiw
exports.getAllRatingAndReview = async(req, res) =>{
    try{
        const ratingReview = await RatingAndReview.find({})
        .sort({rating:'desc'})
        .populate([ 
            {
                path: 'user',
                select:'fistName lastName image'
            },
            {
                path:'course',
                select:'courseName  thumbnail'
            }
        ]).exec();
        if(!ratingReview){
            return res.status(404).json({
                success: false,
                message: 'No rating and review found',
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Rating and review fetched successfully',
            ratingReview,
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server Error, while getting all rating and review',
            error: error.message,
        });
    }
}