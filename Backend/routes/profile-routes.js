const express  =require('express');
const { deleteAccount, updateProfile, getAllUserDetails, getEnrolledCourses, instructorDashboard, updateProfilePicture } = require('../controllers/profile-controllers');
const { auth, isInstructor } = require('../middlewares/auth-middlewares');
const router = express.Router();

router.delete('/deleteProfile',deleteAccount);
router.put('/updateProfile',auth,updateProfile);
router.get('/getUserDetails',auth,getAllUserDetails);
router.get('/getEnrolledCourses',auth,getEnrolledCourses)
router.get('/instructorDashboard',auth,isInstructor,instructorDashboard)
router.put('/updateDisplayPicture',auth,updateProfilePicture)

module.exports = router;

