const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloudinary, uploadVideoToCloudinary } = require('../utils/imageUploader');
require('dotenv').config();

// Create a new subsection
exports.createSubSection = async (req, res) => {
    try {
      // Extract necessary information from the request body
      const { sectionId, title, description} = req.body
   
      const video = req.files.videoFile
  
      // Check if all necessary fields are provided
      if (!sectionId || !title || !description || !video ||!timeDuration) {
        return res
          .status(404)
          .json({ success: false, message: "All Fields are Required" })
      }
    
  
      // Upload the video file to Cloudinary
      const uploadDetails = await uploadVideoToCloudinary(
        video
      )
   
    //   // Create a new sub-section with the necessary information
      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
         videoUrl: uploadDetails.secure_url,
      })
        
      // Update the corresponding section with the newly created sub-section
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
      ).populate("subSection")
  
      // Return the updated section in the response
      return res.status(200).json({ success: true, data: updatedSection })
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error("Error creating new sub-section:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}

//update subsection
// isme dikkat h


exports.updateSubsection = async (req, res)=>{
    try{
        const {sectionId, subSectionId, title, description} = req.body;

        const subsection = await SubSection.findById(subSectionId);

        if(!subsection){
            return res.status(404).json({
                success: false,
                message: 'Subsection not found',
            })
        }

        if(title !== undefined){
            subsection.title = title;
        }
        if(description !== undefined){
            subsection.description = description ;
        }

       const updatedSubSection = await subsection.save();
        res.status(200).json({
            success: true,
            message: 'Subsection updated successfully',
            updatedSubSection
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server Error, while updating Subsection',
            error: error.message,
        })
    }
}

//delete subsection
exports.deleteSubsection = async (req,res) => {
    try{
        //fetch data
        const {subSectionId} = req.body;

        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

        //update section 
        const updatedSection = await Section.findByIdAndUpdate({subSection: deletedSubSection._id}, { $pull:{subSection: deletedSubSection._id}},{new:true}).populate('subSection')

        return res.status(200).json({
            success: true,
            message: 'Subsection deleted successfully',
            data: updatedSection,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server Error, while deleting a Subsection',
            error: error.message,
        })
    }
}