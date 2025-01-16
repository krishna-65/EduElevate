import { useForm } from "react-hook-form";
import Upload from "../Upload";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import IconBtn from "../../../../common/IconBtn";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseAPI";
import { setCourse } from "../../../../../store/reducers/course-reducers";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../../common/Loader";

const SubSectionModal = ({modalData,view=null,edit=null, setAddSubSection}) => {
    const {
         register,
         handleSubmit,
         getValues,
         setValue,
         formState: { errors }} = useForm();

    
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const {course,editCourse} = useSelector((state) => state.course);
   

    useEffect(()=>{
        if(view || edit){
            setValue("lectureTitle", modalData.title);
            setValue("lectureDescription", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
            setValue("timeDuration", modalData.timeDuration || 0);
        }
    },[])

    const isFormUpdated = () => {
        const currentValue = getValues();
        if(currentValue.lectureTitle !== modalData.lectureTitle ||
            currentValue.lectureDescription !== modalData.lectureDescription ||
            currentValue.lectureVideo !== modalData.videoUrl ||
            currentValue.timeDuration!== modalData.timeDuration 
        ){
            return true;
        }else{
            return false;
        }

    }

    const handleLectureSubmit =  async(data)=>{

        const timeDuration =  `${data.hour.padStart(2, "0")}:${data.minutes.padStart(2, "0")}:${data.seconds.padStart(2, "0")}`;
        console.log(data,timeDuration);
            if(edit) {
                if(isFormUpdated()){
                    const currentValue = getValues();
                    const formData = new FormData();
                    formData.append("sectionId", modalData.sectionId)
                    formData.append("subSectionId", modalData.lectureId)
                    formData.append("title", currentValue.lectureTitle)
                    formData.append("description", currentValue.lectureDescription)
                    setLoading(true);
                    const updatedSubSection = await updateSubSection(formData);
                    const updatedCourseContent = course.courseContent.section.map((section)=>section._id === sectionId ? result : section)
                    await dispatch(updateLecture(formData));
                    setLoading(false);
                }
            }else{
                const currentValue = getValues();
                console.log(currentValue);
                const formData = new FormData();
                formData.append("sectionId", modalData._id)
                formData.append("title", currentValue.lectureName)
                formData.append("description", currentValue.lectureDescription)
                formData.append("timeDuration", timeDuration)
                formData.append("videoFile", currentValue.lecture)
                setLoading(true);
            
                const updatedSection = await createSubSection(formData,enqueueSnackbar);
                const updatedCourseContent = course.courseContent.map((section)=>section._id === modalData.sectionId? result : section) 
                dispatch(setCourse({...course, courseContent: updatedCourseContent}));
               
                setLoading(false);
                setAddSubSection(null);
            }
    }
if(loading){
    return <Loader className={`overflow-hidden absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50`}/>
}


   return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">

            <div className="bg-[#0f0f0f] p-10 rounded">
               <div className="flex justify-between">
                 <h1 className="text-lg font-semibold">Add Lecture</h1>
                 <p className="text-white">X</p>
               </div>
                <form className="m-5 p-4 flex flex-col gap-2"
                onSubmit={handleSubmit(handleLectureSubmit)}>
                    <Upload
                     name="lecture"
                     label="Lecture Video"
                     register={register}
                     setValue={setValue}
                     errors={errors}
                     video = {true}
                    />
                   <div className="flex gap-2 flex-col mt-6">
                    <label htmlFor="lectureName">Lecture Title <sup className="text-red-400">*</sup></label>
                        <input
                            type="text"
                            placeholder="Enter Lecture Title"
                            className="border-2 border-gray-800 my-1 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent"
                            {...register("lectureName",{required:true})} />

                   </div>
                   <div className="flex gap-2 flex-col mt-6">
                    <label htmlFor="lectureName">Video Playback Time <sup className="text-red-400">*</sup></label>
                    <div className="flex gap-5 justify-between">
                    <input
                            type="number"
                            placeholder="HH"
                            className="border-2 border-gray-800 my-1 rounded-md p-2  w-20 text-center focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent"
                            {...register("hour",{required:true})} />
                             <input
                            type="number"
                            placeholder="MM"
                            className="border-2 border-gray-800 my-1 rounded-md p-2 w-20 text-center focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent"
                            {...register("minutes",{required:true})} />
                             <input
                            type="number"
                            placeholder="SS"
                            className="border-2 border-gray-800 my-1 rounded-md p-2 w-20 text-center  focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent"
                            {...register("seconds",{required:true})} />
                    </div>

                   </div>

                   <div className="flex gap-2 flex-col mt-6">
                    <label htmlFor="lectureName">Lecture Description <sup className="text-red-400">*</sup></label>
                        <textarea
                            type="text"
                            placeholder="Enter Lecture Description"
                            className="border-2 border-gray-800 my-1 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent"
                            {...register("lectureDescription",{required:true})} />

                   </div>

                    <IconBtn 
                    text = {"Add Lecture"}
                    type="submit"
                    onClick={handleLectureSubmit}
                    className="bg-yellow-400 text-gray-800 font-semibold mt-5 hover:scale-95 transition-all duration-200 rounded py-2"/>
                </form>
            </div>

    </div>
    )
}
export default SubSectionModal;