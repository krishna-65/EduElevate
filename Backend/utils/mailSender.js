const nodemailer = require('nodemailer');
require('dotenv').config();
const mailSender = async (email,title,body) =>{
    try{
        let transporter = nodemailer.createTransport({
          service:'gmail',
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from:process.env.MAIL_USER,
            to:email,
            subject:title,
            text:body,
        })

       return info;

    }
        catch(error){
            console.log('Error sending otp',error)
    }
    
   
}
module.exports = mailSender;