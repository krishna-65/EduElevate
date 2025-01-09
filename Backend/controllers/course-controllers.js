const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const { populate } = require('dotenv');
require('dotenv').config();

//course created 
exports.createCourse = async (req, res) => {
    try{

        //fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, category,tag,instructions,status} = req.body;
        const {thumbnail} = req.files;

       

        if(!courseName||!courseDescription||!whatYouWillLearn||!price||!category||!tag||!instructions){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
        })
        }
        //chcek for instructor
     
        const userId = req.user.id;
        const instructor = await User.findById(userId);

        if(!instructor){
            return res.status(404).json({
                success:false,
                message:'Instructors not found',
            })
        }
     

        //check Categorys details
        const categoryDetails = await Category.findById(category);

        
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:'Category not found',
            })
        }

      

        //upload image
        const thumbnailImage = await uploadImageToCloudinary(thumbnail.tempFilePath,process.env.FOLDER_NAME);

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            category:categoryDetails._id,
            instructor:instructor._id,
            instructions,
            thumbnail:thumbnailImage.secure_url,
            price,
            tag,
            whatYouWillLearn,
        })

        //add course in instructor schema
        await User.findByIdAndUpdate({_id:instructor._id},{$push:{courses:newCourse._id}},{new:true})

        //add course in Category schema
        await Category.findByIdAndUpdate({_id:categoryDetails._id},{$push:{course:newCourse._id}},{new:true});
 
        return res.status(200).json({
            success: true,
            message: 'Course added successfully',
            data:newCourse
        })

    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:'Server error, while creating course',
            error:error.message
        })
    }
}

//get all courses
exports.showAllCourse = async (req, res) =>{
    try{
            //get all course
            const allCourse = await Course.find({},{courseName:true,
                                                    price:true,
                                                    thumbnail:true,
                                                    instructor:true,
                                                    ratingAndReviews:true,
                                                    studentsEnrolled:true,
                                                    }).populate('instructor');

                return res.status(200).json({
                    success:true,
                    message:'Course fetched successfully',
                    courses:allCourse
                })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Server error, while getting all courses',
            error:error.message
        })
    }
}

exports.getAlldetails = async(req,res) => {

    //first fetch the course id
    const courseId = req.body;

    //find course with all details available
    try{
        const courseDetails = await Course.findById(courseId)
        .populate(
            {
                path: 'instructor',
                populate:{
                    path: 'additionalDetails',
                }
            })
            .populate({
                path: 'category',
                populate:{
                    path:'course',
                }
            })
           .populate({
                path:'courseContent',
                populate:{
                    path:'subSection'
                }
            })
            .populate({
                path:'ratingAndReview',
                populate:{
                        path:'user',
                }
            })
            .populate({
                path:'studentsEnrolled',
                populate:{
                        path:'additionalDetails',
                }
            }).exec();

        

       if(!courseDetails){
        return res.status(404).json({
            success: false,
            message: 'Course not found',
        })
       }
       return res.status(200).json({
            success: true,
            message: 'Course details fetched successfully',
            courseDetails: courseDetails
       })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server error, while fetching course details',
            error: error.message
        })
    }


}

//update Course Details

exports.editCourse = async (req, res) => {
    try {
        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            category,
            tag,
            thumbnail,
            instructions,
        } = req.body;

        // Check if all required fields are present
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !category ||
            !tag ||
            !thumbnail ||
            !instructions
        ) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if a new thumbnail needs to be uploaded
        let thumbnailURL = thumbnail;
        if (req.files && req.files.thumbnail) {
            const file = req.files.thumbnail;

            // Upload to Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'courses', // Optional: specify folder in Cloudinary
                resource_type: 'image',
            });

            thumbnailURL = uploadResponse.secure_url;
        }

        // Find the course by ID and update it
        const courseId = req.params.id; // Ensure the course ID is passed as a parameter
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                courseName,
                courseDescription,
                whatYouWillLearn,
                price,
                category,
                tag,
                thumbnail: thumbnailURL,
                instructions,
            },
            { new: true } // Return the updated document
        );

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: 'Course not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            course: updatedCourse,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while updating course',
            error: error.message,
        });
    }
};

exports.getInstructorCourses = async(req,res) => {
    const userId = req.user.id;

    //find instructor courses
    try{
        const instructorCourses = await Course.find({instructor:userId}).populate("category").populate({
            path:'courseContent',
            populate:{
                path:'subSection',
            }
        });
        if(!instructorCourses)
        {
            return res.status(404).json({
                success: false,
                message: 'Instructors not found',
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Instructor courses fetched successfully',
            instructorCourses: instructorCourses
        })
        }catch(error){
            return res.status(500).json({
                success: false,
                message: 'Server error, while getting instructor courses',
                error: error.message
            })
        }
 }

 exports.makeCoursePublic = async(req,res)=>{
    const {courseId} = req.body;
    try{
        //find course and make it public
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {status:Published}, {new:true});
        if(!updatedCourse){
            return res.status(404).json({
                success: false,
                message: 'Course not found',
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Course made public successfully',
            course: updatedCourse
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server error, while making course public',
            error: error.message
        })
    }
}
