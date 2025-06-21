
const Category = require('../models/Category');
const Course = require('../models/Course');
//create Category
exports.createCategory = async (req, res) =>{
    try{
        //fetch data 
        const {name,description} = req.body;

        if(!name||!description){
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            })
        }

        //check if category already exists
        const existingCategory = await Category.findOne({name:name});
        if(existingCategory){
            return res.status(409).json({
                success:false,
                message: "Category already exists"
            })
        }

        //create entry
         const category = new Category({name:name,description:description})
         await category.save();

         return res.status(200).json({
            success:true,
            message:"Category created successfully"
         })
    }catch(error){
            return res.status(500).json({
                success:false,
                message:"Server error, while creating Category",
                error:error.message
            })
    }
}

//fetch all Category
exports.showCategory = async (req, res) =>{
    try{
            //fetch all Category from database
            const allCategory = await Category.find({},{name:true,description:true});
            return res.status(200).json({
                success:true,
                message:"Categories fetched successfully",
                Category:allCategory
            })

    }catch(error){
            return res.status(500).json({
                success:false,
                message:"Server error, while fetching Categories",
                error:error.message
            })
    }
}

//category Page Details
exports.categoryPageDetails = async (req, res) => {
    try {
        // Get category ID
       
        const { categoryId } = req.query;
    
        // Fetch courses for the selected category
        const selectCategoryCourses = await Category.findById(categoryId).populate({
            path: 'course',
            // match: { status: "Published" }, // Ensure "published" matches your schema's field value
        });

        // Validate if category exists
        if (!selectCategoryCourses) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        // Fetch courses for different categories
        const differentCategory = await Category.find({
            _id: { $ne: categoryId },
        }).populate('course'); // Ensure "courses" matches your schema

        // Fetch top-selling courses
        const topSellingCourses = await Course.aggregate([
            {
                $addFields: {
                    enrollmentCount: {
                        $size: { $ifNull: ["$enrolledStudents", []] }, // Use an empty array if `enrolledStudents` is missing
                    },
                },
            },
            {
                $sort: { enrollmentCount: -1 }, // Sort by enrollment count in descending order
            },
            {
                $limit: 10, // Limit to top 10 courses
            },
        ]);
        


        // Send response
        return res.status(200).json({
            success: true,
            message: 'Courses fetched successfully',
            data: {
                selectCategoryCourses,
                differentCategory,
                topSellingCourses,
            },
        });
    } catch (error) {
        // Handle errors
        return res.status(500).json({
            success: false,
            message: 'Error while fetching courses',
            error: error.message,
        });
    }
};
