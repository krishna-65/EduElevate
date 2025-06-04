const mongoose = require('mongoose');
const mailSender = require("../utils/mailSender");
const { emailVerification } = require('../mail-tamplates/email-verification');

const OTPSchema =mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    },

});

    
OTPSchema.index({ email: 1, otp: 1 }, { unique: true });

    //a function for mail send
    async function sendVerificationEmail(email,otp){
        try{
                const mailResponse = await mailSender(email,"Verification Email from EduElevate", emailVerification(otp));
                console.log("Email sent successfully");
        }catch(error){
            console.log("Error occur while sending email",error);
            throw error;

        }
    }

    OTPSchema.pre("save", async function(next){
        await sendVerificationEmail(this.email,this.otp);
    })


module.exports  = mongoose.model("OTP",OTPSchema);