const User  = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Profile = require('../models/Profile');
const mailSender = require('../utils/mailSender');
require('dotenv').config();

//send OTP
exports.sendOTP = async ( req, res ) => {
        try{
                   //fetch email 
                const {email} = req.body;

                //check if user already exists
                const checkUserPresent = await User.findOne({email});

                //if user already exist, then return a response
                if(checkUserPresent) {
                    return res.status(401).json({
                        success: false,
                        message:'User already Exist',
                    })
                }
                
                var otp = otpGenerator.generate(6,{
                    upperCaseAlphabets:false,
                    lowerCaseAlphabets:false,
                    specialChars:false,
                })
                console.log("otp generated", otp);

                //check otp is unique or not
                let result = await OTP.findOne({otp:otp});

                while(result){
                     otp = otpGenerator.generate(6,{
                        upperCaseAlphabets:false,
                        lowerCaseAlphabets:false,
                        specialChars:false,
                    })
                    result = await OTP.findOne({otp:otp});
                }
                
                

                const otpPayload = {email,otp};

                //create an entry in database for otp
                const otpBody = await OTP.create(otpPayload);
                console.log("otp created", otpPayload);

                

                return res.status(200).json({
                    success: true,
                    message:'OTP sent successfully',
                    otp,
                    otpBody,
                })
                
        }catch(error){
                return res.status(500).json({
                    success: false,
                    message: 'Server Error, while creating otp',
                    error: error.message,
                })
        }
}

//signup
exports.signUp = async(req,res) => {
    try{
            //data fetch from request
            const {formData} = req.body;
            const { firstName, lastName, email, password, confirmPassword, accountType, otp } = formData;
               
               // validate data
                if(!firstName || !lastName || !email || !password || !confirmPassword || !otp ) {
                    return res.status(403).json({
                        success: false,
                        message: 'All fields are required',
                    });
                }


                //check if password matches
                if(password !== confirmPassword){
                    return res.status(400).json({
                        success: false,
                        message: 'Passwords do not match',
                    });
                }

                //check if user already exists
                const checkUserPresent = await User.findOne({ email });
                if(checkUserPresent) {
                    return res.status(400).json({
                        success: false,
                        message: 'User is already registered',
                    });
                }

                //find recent otp stored for the user
                const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);

                //if no recent otp found or otp is not valid
                if(recentOTP.length == 0){
                    return res.status(400).json({
                        success: false,
                        message: 'No recent OTP found',
                    });
 
                }
            
        
                //check if otp is valid
                if(recentOTP[0].otp !== otp){
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid otp',
                    });
                }

        
                //password Hashed 
                const hashedPassword = await bcrypt.hash(password, 10);

                const profileDetails = await Profile.create({
                    gender:null,
                    dateOfBirth:null,
                    about:null,
                    contactNumber:null,
                })

                const user = new User({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    accountType,
                    additionalDetails: profileDetails._id,
                    courseProgress:[],
                    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
                })

                // save user to database
                await user.save();

                return res.status(200).json({
                    success: true,
                    message: 'User registered successfully',
                })

    }catch(error){

        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });

    }
}

//login
exports.login = async (req, res) => {
    try{
            //fetch data from request 
            const { email, password } = req.body;
                
                //validate data
                if(!email ||!password ) {
                    return res.status(403).json({
                        success: false,
                        message: 'All fields are required, please try again',
                    });
                }
            
                //find user by email
                const user = await User.findOne({ email }).populate("additionalDetails");
                
                //if user not found
                if(!user) {
                    return res.status(401).json({
                        success: false,
                        message: 'User is not registered, please signup first',
                    });
                }
                
                //compare password
                const isMatch = await bcrypt.compare(password, user.password);
                
                //if password not match
                if(!isMatch) {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid password',
                    });
                }

                if(isMatch){
                        const payload = {
                            email: user.email,
                            id: user.id,
                            accountType:user.accountType,
                        }
                    //generate JWT token
                     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

                     user.token = token;
                     user.password = undefined;


                     const options = { expires: new Date(Date.now() + 3*24*60*60*1000),
                                        httpOnly:true,
                                        secure:true,
                                        sameSite:'none'
                                    };
                     //generate cookie and send response

                     res.cookie("token",token,options).status(200).json({
                            success: true,
                            message: 'User logged in successfully',
                            user,
                            expiresTime: Date.now() + 2 * 60 * 60 * 1000
                        });
            }

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
}

//logout
exports.logout = async( req,res) => {
    try{
       
        res.clearCookie('token',{
            httpOnly: true,
            secure:true,
            sameSite:'strict',
        });
        return res.status(200).json({
            success: true,
            message: 'User logged out successfully',
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
}
//changed Password
exports.changedPassword = async (req, res)=>{
    try{
        //fetch data from request
        
   
    }catch(error){
        return res.status(500).json({
            success:true,
            message:'Server Error'
        })
    }
}