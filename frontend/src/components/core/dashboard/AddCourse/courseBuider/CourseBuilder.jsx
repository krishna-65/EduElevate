import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { useState } from "react";
import { VscAdd, VscArrowRight } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setStep } from "../../../../../store/reducers/course-reducers";
import { enqueueSnackbar } from "notistack";
import { createSection, updateSection } from "../../../../../services/operations/courseAPI";
import NestedView from "./NestedView";

const CourseBuilder = () => {
    const {register, setValue,handleSubmit, formState:{errors}} = useForm();
    const [editSection,setEditSection] = useState(null);
    const { course, editCourse } = useSelector((state) => state.course);;
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
  

    const cancelEdit  = () => {
        setEditSection(null);
        setValue("sectionName","");
    }

    const goBack = ()=>{
        dispatch(setStep(1));
        dispatch(setEditSection(true));
    }
   

    const goToNext = ()=>{
            if(course.courseContent.length === 0){
                enqueueSnackbar("Please add atleast one section ", {variant:false});
                return;
            }
            if(course.courseContent.some((section)=>section.subSection.length === 0)){
                enqueueSnackbar("Please add atleast one lecture in each section ", {variant:false});
                return;
            }
            dispatch(setStep(3));        
    }

    const handleFormSubmit = async(data) =>{
       setLoading(true);
        let result;
        if(editSection){
            result = await updateSection(
                {
                    sectionName:data.sectionName,
                    sectionId:editSection,
                    courseId:course._id
                }
            )
            if(result){
                const updatedCourseContent = course.courseContent.map((section)=>section._id === result._id ? result : section)
                const updatedCourse = {...course, courseContent:updatedCourseContent}
                console.log(updatedCourse);
              dispatch(setCourse(updatedCourse))
                cancelEdit();
            }
        }
        else{
            result = await createSection(
                {
                    sectionName:data.sectionName,
                    courseId: course._id,
                }
            )
            if(result){
                dispatch(setCourse(result));
                setEditSection(null);
                setValue("sectionName","");
            }
        }
        
        setLoading(false);
    }

    
    const handleChangedEditSection = (sectionId,sectionName) => {
        if(editSection === sectionId){
            cancelEdit();
            return;
        }
        setEditSection(sectionId);
        setValue("sectionName",sectionName);
    }

    console.log(course)

    return(
        <div className="text-white bg-[#161515] p-5 rounded">
            <p className="text-sm mb-3">Course Builder</p>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="section" className="text-sm ">Section Name <sup className="text-red-400 ">*</sup></label>
                    <input type="text" 
                    id="sectionName"
                    placeholder="Add section name"
                    {...register('sectionName',{required:true})}
                    className="bg-transparent border-gray-800 border-2 focus:outline-none rounded focus:ring-2 focus:blue-600 px-3 py-2 w-full"/>
                    {errors.sectionName && (
                        <span>Section name is required</span>
                    )}
                </div>
                <div className="mt-10 flex gap-5">
                    <IconBtn
                    type="Submit"
                    text={editSection ? "Edit Section Name" : "Create Section"}
                    outline={true}
                    className={`bg-transparent  gap-1 border-blue-700 text-blue-500 hover:scale-95 transition-all duration-200 ${loading ? "pointer-events-none opacity-50" : "flex items-center"}`}
                    >
                           <VscAdd/>
                 </IconBtn>
                 {editSection && (
                    <button
                    type="submit"
                    onClick={cancelEdit}
                    className="text-sm text-white">Cancel Edit</button>
                 )}
                </div>
            </form>
            {course.courseContent.length > 0 && (
  <NestedView handleChangedEditSection={handleChangedEditSection} />

)}
                 <div className="flex justify-end gap-5">
                        <button onClick={goBack} className="rounded-md cursor-pointer px-6  items-center bg-blue-500">Back</button>
                        <IconBtn text="Next" className="flex gap-2 bg-yellow-400 px-3 text-gray-800" onClick={goToNext}><VscArrowRight/></IconBtn>
                 </div>

        </div>
    )
}
export default CourseBuilder;