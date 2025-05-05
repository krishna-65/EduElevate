const express = require('express');
const { auth, isInstructor, isStudent } = require('../middlewares/auth-middlewares');
const { createCourse, showAllCourse, getAlldetails, editCourse, getInstructorCourses, makeCoursePublic } = require('../controllers/course-controllers');
const { createSection, updateSection, deleteSection } = require('../controllers/section-controllers');
const { createSubSection, updateSubsection, deleteSubsection } = require('../controllers/sub-section-controllers');
const { createRatingAndReview, getAverageRating, getAllRatingAndReview } = require('../controllers/ratingAndReveiw-controller');
const { showCategory, categoryPageDetails, createCategory } = require('../controllers/category-controllers');
const mailSender = require('../utils/mailSender');
const router = express.Router();

router.post('/createCourse',auth,isInstructor,createCourse);
router.post('/addSection',auth,isInstructor,createSection);
router.put('/updateSection',auth,isInstructor,updateSection);
router.delete('/deleteSection',auth,isInstructor,deleteSection);
router.post('/addSubSection',auth,isInstructor,createSubSection);
router.put('/updateSubSection',auth,isInstructor,updateSubsection);
router.delete('/deleteSubSection',auth,isInstructor,deleteSubsection);
router.put('/editCourse',auth,isInstructor,editCourse);
router.put('/makePublic', auth, isInstructor, makeCoursePublic)

router.get('/getAllCourses',showAllCourse);
router.get('/getCourseDetails',getAlldetails);

// router.post('/createCategory',createCategory);
router.get('/showAllCategories',showCategory);
router.get('/getCategoryPageDetails',categoryPageDetails);




router.post('/getInstructorCourses',auth,isInstructor,getInstructorCourses);
router.post('/createRating',auth,isStudent,createRatingAndReview);
router.get('/getAverageRating',auth,isStudent,getAverageRating);
router.get('/getReview',auth,isStudent,getAllRatingAndReview);



module.exports = router;
