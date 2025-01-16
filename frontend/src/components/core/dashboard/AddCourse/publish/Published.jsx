import { useState } from "react";
import { setStep } from "../../../../../store/reducers/course-reducers";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../common/Loader";
import { makeCoursePublic } from "../../../../../services/operations/courseAPI";


const PublishCourse = ()=>{
    const [isChecked, setIsChecked] = useState(false)
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {course} = useSelector((state)=>state.course);
    console.log(course)

    const goBack = () => {
        dispatch(setStep(2));

    }
    const handleSaveDraft = ()=>{
        enqueueSnackbar("Course saved as draft", {variant:"success"});
        navigate('/dashboard/my-courses')
    }
    const handlePublishCourse = async ()=>{
        if(!isChecked){
            enqueueSnackbar("Please check the 'Make this Course Public' checkbox to publish the course", {variant:"error"});
            return;
        }
        setLoading(true);
        const response = await makeCoursePublic(course._id,enqueueSnackbar)
        setLoading(false);
        navigate('/dashboard/my-courses');
    }
    if(loading){
        return(
            <Loader/>
        )
    }
    return(
        <>
                <div className="bg-[#161515] rounded p-5">
                    <h2 className="text-3xl text-gray-100 font-semibold">Publish Settings</h2>
                    <div className="flex flex-col items-start mt-5 mx-2">
                        <label className="flex items-center space-x-2">
                            <input
                            type="checkbox"
                            // checked={isChecked}
                            onChange={()=>setIsChecked(!isChecked)}
                            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-gray-100 ">Make this Course Public</span>
                        </label>
                        <p className="mt-4 text-sm text-gray-400">
                            The checkbox is {isChecked ? "checked" : "unchecked"}. 
                        </p>
                        </div>
                </div>
                        <div className="flex p-5 justify-between mt-10 ">
                        <div>
                            <button className="border-2 border-blue-600 px-7 shadow hover:scale-95 hover:font-semibold transition-all duration-200 py-2 rounded"
                            onClick={goBack}>Back</button>
                        </div>
                        <div className="gap-3 flex">
                            <button className="border-2 border-blue-600 px-7 shadow hover:scale-95 hover:font-semibold transition-all duration-200 py-2 rounded"
                            onClick={handleSaveDraft}>Save as Draft</button>
                            <button onClick={handlePublishCourse} className="bg-yellow-400 text-gray-800 font-semibold px-7 shadow hover:scale-95 transition-all duration-200 py-2 rounded">Save and Publish</button>
                        </div>
                    </div>
                    </>
    )
}
export default PublishCourse;