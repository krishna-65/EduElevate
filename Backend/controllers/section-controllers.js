const Section = require('../models/Section');
const Course  = require('../models/Course');
const SubSection = require('../models/SubSection');
const { populate } = require('dotenv');

// Create a new section
exports.createSection = async (req, res) =>{
    try{
            //get data
            const {sectionName,courseId} = req.body;

            //validate
            if(!sectionName ||!courseId){
                return res.status(400).json({
                    success: false,
                    message: 'Please provide all required fields',
                })
            }
            
            //check if course exists
            const course = await Course.findById(courseId);
            if(!course){
                return res.status(404).json({
                    success: false,
                    message: 'Course not found',
                })
            }

            // Create the new section
            const newSection = await Section.create({ sectionName });

            // Populate the subSection field
            const populatedSection = await Section.findById(newSection._id).populate('subSection');

            //add section to course
            const updateCourse = await Course.findByIdAndUpdate(courseId,{ $push:{courseContent: populatedSection._id}},{new:true}).populate("courseContent");

            //send response
            return res.status(201).json({
                success: true,
                message: 'New section created successfully',
                updateCourse:updateCourse,
            })
    
        
        }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server Error, while creating a new section',
            error: error.message,
        })
    }
}

// updateSection
exports.updateSection = async (req,res) =>{
    try{
        //get data
        const {sectionName,sectionId,courseId} = req.body;

        //validate
        if(!sectionName||!sectionId){
            return res.status(400).json({
                success: false,
                message: 'Please provide section name',
            })
        }
        
        //find and update section
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true}).populate('subSection');
        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();

        return res.status(200).json({
            success: true,
            message: 'Section updated successfully',
            section: section,
            course: course
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server Error, while updating a section',
            error: error.message,
        })
    }
}


// deleteSection
exports.deleteSection = async (req,res) =>{
    try{
        
            //get data
          
            const {sectionId,courseId} = req.body;
            
            //validate
            if(!sectionId||!courseId){
                return res.status(400).json({
                    success: false,
                    message: 'Please provide section id && course id',
                })
            }
          

            const section = await Section.findById(sectionId);
            if(!section){
                return res.status(404).json({
                    success: false,
                    message: 'Section not found'
                })
            }
          
            //delete SubSection 
            await SubSection.deleteMany({_id:{$in: section.SubSection}})
            
            //find and delete section
            const deletedSection = await Section.findByIdAndDelete(sectionId);

            //update course
            const updateCourse = await Course.findByIdAndUpdate(   courseId ,   { $pull: {  courseContent: sectionId }},{new:true}).populate({
                path:"courseContent",
                populate:{
                    path:"subSection",
                },
            });

            return res.status(200).json({
                success: true,
                message: 'Section deleted successfully',
                deletedSection: deletedSection,
                updateCourse: updateCourse,
            })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server Error, while deleting a section',
            error: error.message,
        })
    }
}