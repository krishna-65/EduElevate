const express = require('express');
const app = express();

const userRoutes = require('./routes/user-routes');
const profileRoutes = require('./routes/profile-routes');
const courseRoutes = require('./routes/course-routes');
const paymentRoutes = require('./routes/payment-routes');

const database = require('./config/database');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const { uploadImageToCloudinary } = require('./utils/imageUploader');
const { send } = require('./controllers/contact-controller');

dotenv.config();

const PORT  =process.env.PORT || 3000

//cloudinary
cloudinaryConnect();

//dabase connect
database();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({

        origin:['http://localhost:5173','https://eduelevate-1.onrender.com'],
        credentials:true,
    })
)

app.use(
    fileUpload(
        {
            useTempFiles: true,
            tempFileDir: '/tmp',
        }
    )
);

//cloudinary connection
cloudinaryConnect();

//routes
app.use('/api/v1/auth',userRoutes);

app.use('/api/v1/profile',profileRoutes);

app.use('/api/v1/course', courseRoutes);

app.use('/api/v1/payment', paymentRoutes);



//start server
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})


