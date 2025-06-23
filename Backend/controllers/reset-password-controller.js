const User = require('../models/User');
const bcrypt = require('bcryptjs');
const mailSender = require('../utils/mailSender');

//reset password token and link sent
exports.resetPasswordToken = async (req,res) => {
    try{
        //get email from req
        const {email} = req.body;

        //check user availability
        const user  = await User.findOne({email:email});
         if(!user){
            return res.status(401).json({
                success: false,
                message: 'Email is not registered'
            })
         }

         //generate token
         const token  = crypto.randomUUID();

         //update user add token and expire time
         const updateUser = await User.findOneAndUpdate({email:email},{token:token, resetPasswordExpires: Date.now() + 5*60*1000},{new:true});

         //create url
         const url = `http://localhost:5173/update-password/${token}`;

         //send mail
         await mailSender(email,
                         "Password Reset Link",
                          `Password Reset Link: ${url}` );
            
                          return res.status(200).json({
                            success: true,
                            message:'Password reset link sent successfully, please check email and change password'
                          })



    }catch(error){
        return res.status(500).json({
            success: false,
            message:"Something went wrong, while resetting password"
        })
    }
}

//update password 
exports.resetPassword = async(req,res) =>{
        try{

            const { password, confirmPassword,token} = req.body;

            //validate password
            if(password !== confirmPassword) {
                return res.status(401).json({
                    success: false,
                    message:"Password and confirm password both are different",
                    password,
                    confirmPassword
                })
            }

            //get user from db using token
            let user = await User.findOne({token:token});


            //if user is not found
            if(!user){
                return res.status(401).json({
                    success:false,
                    message:"Token is  invalid",
                })
            }

            //check token time
            if(user.resetPasswordExpires < Date.now()){
                    return res.status(401).json({
                        success:false,
                        message:"Token expired, please try again",
                    })
            }
       
            //password hashed
            const hashedPassword = await bcrypt.hash(password,10);

            user = await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});
            return res.status(200).json({
                success:true,
                message:"Password reset successfully"
            })

        }catch(error){
            return res.status(500).json({
                success: false,
                message:"Password reset link sent successfully, please check email and change password",
            })

        }
}