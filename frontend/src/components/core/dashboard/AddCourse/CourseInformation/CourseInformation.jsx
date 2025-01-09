
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setStep } from "../../../../../store/reducers/course-reducers";
import Upload from "../Upload";
import ChipInput from "./ChipInput";
import RequirementFields from "./RequirementFields"
import { enqueueSnackbar } from "notistack";
import { COURSE_STATUS } from "../../../../../utils/constants";
import Loader from "../../../../common/Loader";
import { addCourseDetails } from "../../../../../services/operations/courseAPI";

const CourseInformation = () => {
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const {categories}  = useSelector((state) => state.category);
  
    const dispatch = useDispatch();
    console.log(course);
    

    useEffect(() => {
        // Populate form fields if editing
        if (editCourse) {
            setValue("courseName", course?.courseName || "");
            setValue("courseDescription", course?.courseDescription || "");
            setValue("price", course?.price || "");
            setValue("thumbnail",course?.thumbnail||"");
            setValue("category",course?.category._id|| "");
            setValue("instructions", course?.instructions || []);
            setValue("whatYouWillLearn", course?.whatYouWillLearn||"");
            setValue("tag", course?.tag || []);
            console.log(getValues());
        }
    }, [editCourse, course, setValue]);

    const isFormUpdated = () =>{
        const currentValue = getValues();
        if(
            currentValue.courseName!== course?.courseName ||
            currentValue.courseDescription!== course?.courseDescription ||
            currentValue.category!== course?.category ||
            currentValue.price!== course?.price ||
            currentValue.instructions.toString()!== course?.instructions.toString() ||
            currentValue.tag.toString()!== course?.tag.toString() ||
            currentValue.category._id!== course?.category._id ||
            currentValue.whatYouWillLearn!== course?.whatYouWillLearn
        ){
            return true;
        }
        return false;
    }

    const onSubmit = async(data) => {
  
       if(editCourse){
        if(isFormUpdated()){
            const currentValue = getValues();
            console.log(currentValue);
            const formData = new FormData();
            formData.append("courseId", course._id)
            if(currentValue.courseName !== course.courseName){
                formData.append("courseName", data.courseName);
            }
            if(currentValue.courseDescription!== course.courseDescription){
                formData.append("courseDescription", data.courseDescription);
            }
            if(currentValue.price!== course.price){
                formData.append("price", data.price);
            }
            if(currentValue.thumbnail!== course.thumbnail){
                formData.append("thumbnail", currentValue.thumbnail);
            }
            if(currentValue.category._id!== course.category._id){
                formData.append("categoryId", data.category._id);
            }
            if(currentValue.whatYouWillLearn!== course.whatYouWillLearn){
                formData.append("whatYouWillLearn", data.whatYouWillLearn);
            }
            if(currentValue.instructions.toString()!== course.instructions.toString()){
                formData.append("instructions", JSON.stringify(data.instructions));
            }
            if(currentValue.tag.toString()!== course.tag.toString()){
                formData.append("tags", JSON.stringify(data.tag));
            }
            setLoading(true);
            const result ="hello";
            if(result){
                dispatch(setStep(2));
                // dispatch(setCourse(data));
            }
        }else{
            enqueueSnackbar("No changes made to the form", {variant:"info"})
        }
        return ;
       }
       const formData = new FormData()
            formData.append("courseName", data.courseName)
            formData.append("courseDescription", data.courseDescription)
            formData.append("price", data.price)
            formData.append("tag", JSON.stringify(data.tag))
            formData.append("whatYouWillLearn", data.whatYouWillLearn)
            formData.append("category", data.category)
            formData.append("status", COURSE_STATUS.DRAFT)
            formData.append("instructions", JSON.stringify(data.instructions))
            // Ensure thumbnail is appended as a file
            if (data.thumbnail instanceof File) {
                formData.append("thumbnail", data.thumbnail);
            } else {
                alert("Thumbnail is not a file!");
            }
            setLoading(true)
            const result = await addCourseDetails(formData)
            if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
            }
            setLoading(false)
        
    };

    if(loading){
        return <Loader/>
    }

    return (
        <div>
            <form
                className="rounded-md shadow bg-[#161515] p-5 flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)} // Use react-hook-form's handleSubmit
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="courseName">
                        Course Title <sup className="text-red-400">*</sup>
                    </label>
                    <input
                        type="text"
                        id="courseName"
                        name="courseName"
                        className="bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 border-2 border-gray-800 px-4 py-2 text-sm"
                        placeholder="Enter your course title"
                        {...register("courseName", { required: "Course Title is required" })}
                    />
                    {errors.courseName && (
                        <p className="text-red-500 text-sm">{errors.courseName.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="courseDescription">
                        Course Short Description <sup className="text-red-400">*</sup>
                    </label>
                    <textarea
                        id="courseDescription"
                        placeholder="Enter Description"
                        {...register("courseDescription", { required: "Description is required" })}
                        className="bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 border-2 border-gray-800 px-4 py-2 text-sm"
                    />
                    {errors.courseDescription && (
                        <p className="text-red-500 text-sm">{errors.courseDescription.message}</p>
                    )}
                </div>

                     <div className="flex flex-col gap-2">
                     <label htmlFor="category">Category</label>
                     <select
                         name="category"
                         id="category"
                         className="bg-[#161515] border-2 border-gray-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                         {...register("category",{required:true})}
                     >
                         <option
                         value=""
                         className="bg-[#161515] text-gray-400 border-2 border-gray-800 px-4 py-2 text-sm"
                         >
                         Select Category
                         </option>

                         {categories.map((category, index) => (                         <option
                             key={index}
                             value={category._id}
                             className="bg-[#161515] text-white hover:bg-blue-500 focus:bg-blue-600 border-2 border-gray-800 px-4 py-2 text-sm"
                         >
                             {category.name}
                         </option>
                         ))}
                     </select>
                 </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="price">
                        Price <sup className="text-red-400">*</sup>
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 border-2 border-gray-800 px-4 py-2 text-sm"
                        placeholder="Enter price"
                        {...register("price", { required: "Price is required" })}
                    />
                    {errors.price && (
                        <p className="text-red-500 text-sm">{errors.price.message}</p>
                    )}
                </div>

                   <Upload
                        name="thumbnail"
                        label="Course Thumbnail"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        editData={editCourse ? course?.thumbnail : null}
                    />
                    <ChipInput
                     label="Tags"
                     name="tag"
                     placeholder="Enter Tags and press Enter"
                     register={register}
                     errors={errors}
                     setValue={setValue}
                     getValues={getValues}
                    />

                <div className="flex flex-col gap-2">
                    <label htmlFor="whatYouWillLearn">Benefits of the course <sup className="text-red-400">*</sup></label>
                    <textarea 
                    id="whatYouWillLearn"
                    name="whatYouWillLearn"
                    className="bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 border-2 border-gray-800 px-4 py-2 text-sm"
                    placeholder="Enter your benefits of this course"
                    {...register("whatYouWillLearn",{required:true})} />
                    {errors.whatYouWillLearn && <p className="error">{errors.whatYouWillLearn.message}</p>}
                </div>
                
                <RequirementFields
                 name="instructions"
                 label="Requirements/Instructions"
                 placeholder="Add Instructions"
                 register={register}
                 setValue={setValue}
                 errors={errors}
                 getValues={getValues}/> 

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Next"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourseInformation;
