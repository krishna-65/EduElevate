const Profile = require('../models/Profile');
const User = require('../models/User');
const Course = require('../models/Course');
const Category = require('../models/Category');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const cloudinary = require('cloudinary').v2
require('dotenv').config();
//update profile
exports.updateProfile = async (req,res) => {
    try{
        //get data
        const {firstName, lastName, dateOfBirth="",about="",gender} = req.body;

        const userid = req.user.id;

        const userDetails = await User.findById(userid);
        const profileId = userDetails.additionalDetails;

        const profile = await Profile.findById(profileId);

        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        await userDetails.save();
      
        
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        // profile.contactNumber = contactNumber;
        profile.gender = gender;
        
        await profile.save();

        const updatedUser = await User.findById(userid).populate("additionalDetails");

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            updatedUser,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Server error, while updating profile",
            error: error.message
        })
    }
}

//delete profile

//isme dikkat hai
exports.deleteAccount = async (req,res) =>{
    try{
            //get data 
            const userid = req.user.id;

            //validate
            if(!userid){
                return res.status(400).json({
                    success: false,
                    message: 'Please provide user id',
                })
            }

            const user = await User.findById(userid);
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                })
            }
            const deleteProfile = await Profile.findByIdAndDelete(user.additionalDetails);

            const deleteUser = await User.findByIdAndDelete({_id:user._id});


            //ToDo: Unrolled user from courses
            return res.status(200).json({
                success: true,
                message: 'Account deleted successfully'
            })
    }catch(error){
            return res.status(500).json({
                success: false,
                message: 'Server error, while deleting account',
                error: error.message
            })
    
    }
}


//get profile
exports.getAllUserDetails = async (req, res) =>{

    try{
        //get data
       
        const userid = req.user.id;

        //find user
        const user = await User.findById(userid).populate('additionalDetails');

        return res.status(200).json({
            success: true,
            message: 'User details fetched successfully',
            user
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server error, while getting user details',
            error: error.message
        })
    }
}

//get Enrolled Course
exports.getEnrolledCourses= async(req,res) =>{
    try{
            const userID = req.user.id;
            const user = await User.findById(userID).populate("courses").exec();
            if(!user){
                return res.status(400).json({
                    success: false,
                    message: 'User not found!'
                })
            }
            return res.status(200).json({
                success:true,
                message: 'Courses Fetched successfully',
                data: user.courses

            })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.instructorDashboard = async(req,res)=>{
    try{
        const userId = req.user.id;
        const courseDetails = await Course.find({instructor:userId}).populate("category");
       
        const courseData = courseDetails.map((course)=>{
            const totalStudentsEnrolled = course.studentEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled*course.price;

            //create a new objectw with the additional fields
            const courseDataWithStats = {
                _id:course.id,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }
            return courseDataWithStats;
        })
        return res.status(200).json({
            success:true,
            courses:courseData,
        
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.updateProfilePicture = async(req,res) =>{
   
    const userId = req.user.id;
    try{
        const user = await User.findById(userId);
        const oldImage = user.image;
        const file = req.files.file;
        // Extract the public ID of the old image from its URL
        const oldPublicId = oldImage.split("/").pop().split(".")[0]; // Extract the public ID from the URL

        // Delete the old image from Cloudinary
        if (oldPublicId) {
        await cloudinary.uploader.destroy(oldPublicId, (error, result) => {
            if (error) {
            console.error("Error deleting old image:", error);
            } else {
            console.log("Old image deleted successfully:", result);
            }
        });
        }
    
        // Upload the new image to Cloudinary
        const result  = await uploadImageToCloudinary(file,process.env.FOLDER_NAME);

       if(result){
        console.log("hi");
        console.log(result);
        user.image = result.secure_url;
        await user.save();
       }
       console.log("hi2");
          // Optionally fetch the updated user from the database
    const updatedUser = await User.findById(userId);
    
        return res.status(200).json(
            {success: true,
            message: "Profile picture updated successfully",
            updatedUser});

    }catch(error){
        console.error("Error fetching user:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update picture",
            error:error.message
        });
    }
}

