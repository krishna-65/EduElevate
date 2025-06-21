const jwt  = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

//auth
exports.auth = async(req,res,next) => {
    try{
            //extract data from cookie
            const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer","");

            //token not found
            if(!token){
                return res.status(401).json({
                    success:false,
                    message:'Token is missing'
                })
            }

            //verify the token 
            try{
                const decode =  jwt.verify(token,process.env.JWT_SECRET)
                req.user = decode;
            }catch(error){
                return res.status(401).json({
                    success:false,
                    message:'Token is invalid'
                })
            }

            next();
    }catch{
        return res.status(401).json({
            success:false,
            message:"Something went wrong while velidating the token"
        })
    }
}

//isStudent
exports.isStudent = async (req,res, next) => {
    try{
            if(req.user.accountType !== "Student"){
                return res.status(401).json({
                    success:false,
                    message:'This is protected route for Student Only'
                })
            }
            next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"User role connot be varified, please try again"
        })
    }
}

//isInstructor
exports.isInstructor = async (req,res, next) => {
   
    try{
        
            if(req.user.accountType !== "Instructor"){
                return res.status(401).json({
                    success:false,
                    message:'This is protected route for Instructor Only'
                })
            }
            next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"User role connot be varified, please try again"
        })
    }

}

//isAdmin
exports.isAdmin = async (req,res, next) => {
    try{
            if(req.user.accountType !== "Admin"){
                return res.status(401).json({
                    success:false,
                    message:'This is protected route for Admin Only'
                })
            }
            next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"User role connot be varified, please try again"
        })
    }
}
