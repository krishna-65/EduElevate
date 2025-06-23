const {instance}  = require('../config/razorpay-config');
const Course  = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {courseEnrollment} = require('../mail-tamplates/course-enrollment');
const  mongoose  = require('mongoose');

//capture the payment and initiate the razorpay order
exports.capturePayment = async (req,res) =>{
    try{
            //get courseId and userId
            const {courseId} = req.body;
            const userId =  req.user.id;

            //validate
            if(!courseId || !userId){
                return res.status(400).json({
                    success: false,
                    message: 'Please provide courseId and userId',
                })
            }
            
            //find course and user
            const course = await Course.findById(courseId);
            if(!course){
                return res.status(404).json({
                    success: false,
                    message: 'Course not found',
                })
            }

            //verify user is already buy or not
            const uid = mongoose.Types.ObjectId.isValid(String(userId)) 
            ? new mongoose.Types.ObjectId(String(userId)) 
            : null;

            if (!uid) {
                console.error("Invalid userId format");
              }

            if(course.studentEnrolled.includes(uid)){
                return res.status(400).json({
                    success: false,
                    message: 'Student is already enrolled in this course',
                })
            }
           

            //order create 
            const amount = course.price;
            const currency = "INR";
            const options = {
                amount: amount * 100,
                currency: currency,
                receipt: Math.random(Date.now().toString()),
                notes:{
                    courseId: courseId,
                    userId: userId
                },
                payment_capture: 1
            }
            
            // initiate the payment using razorpay
                const paymentResponse = await instance.orders.create(options);
                console.log(paymentResponse);
            
        
            return res.status(200).json({
                success: true,
                courseName:course.CourseName,
                courseDescription:course.CourseDescription,
                thumbnail:course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
                message: 'Order created successfully',
            })
    }catch(error){
            return res.status(500).json({
                success: false,
                message: 'Server error, while capturing payment',
                error: error.message
            })
    }
}


exports.verifySignature = async(req,res) =>{

    //get signature fromserver
    const webhookSecret = "12345678";

    //get signature from razorpay
    const signature = req.headers('x-razorpay-signature');

    //first encrpted the server signature
    //hmac-Hash-based Message Authentication Code is funstion get two thing first algo and second data
    const encryptedSignature = crypto.createHmac('sha256', webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log('Payment is authorized');
       
        const {userId, courseId} = req.body.payload.payment.entity.notes;

        try{
                //find the course and enrolled the student
                const enrolledCourse = await Course.findByIdAndUpdate({_id:courseId},{$push:{studentEnrolled:userId}},{new:true});
                if(!enrolledCourse){
                    return res.status(500).json({
                        success:false,
                        message: 'Server error, while enrolling the student',
                        error: error.message
                    })
                }
                console.log(enrolledCourse);

                //update student course
                const student = await User.findByIdAndUpdate({_id:userId},
                    {$push:{courses:courseId}},
                    {new:true});
                    
                if(!student){
                    return res.status(500).json({
                        success:false,
                        message: 'Server error, while updating student course',
                        error: error.message
                    })
                }

                //send email to student
               const emailResponse = await mailSender(
                                                        student.email,
                                                        "Congratulation from EduElevate",
                                                        "Congratulations, you are onboarded into EduElevate course"
                                                    )

                                                    return res.status(200).json({
                                                        success:true,
                                                        message:'Signare varified and course added',
                                                    })

        }catch(error){
            return res.status(500).json({
                success: false,
                message: 'Server error, while enrolled student',
                error: error.message
            })
        }
    }else{
        return res.status(400).json({
            success: false,
            message: 'Invalid signature',
            error: 'Invalid signature'
        })
    }

}


