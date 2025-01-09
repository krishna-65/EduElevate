import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { getUserEnrolledCourse } from "../../../services/operations/ProfileAPI";
import { enqueueSnackbar } from "notistack";
import ProgressBar from "@ramonak/react-progress-bar";
import Loader from "../../common/Loader";

const EnrolledCourses = () =>{

    const [enrolledCourses,setEnrolledCourses] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
            try{
                const response =  dispatch(getUserEnrolledCourse());
                setEnrolledCourses(response)
            }catch(error){
                console.log("Unable to fetch Enrolled Courses")
                enqueueSnackbar("Unable to fetch Enrolled Courses", {variant: "error"});
            }
    },[])

    return(
        <div className="min-h-screen">
                <h3 className="text-2xl font-semibold text-[#cfc3c3]">Enrolled Courses</h3>
                {
                    !enrolledCourses ? (<Loader className="bg-transparent "/>) 
                    : !enrolledCourses.length ? (<div className=" h-[80vh]  flex justify-center items-center">
                        <p className="text-lg">You have not enrolled in any course yet !</p>
                    </div>)
                    :(
                        <div>
                           <div className="grid grid-cols-3 p-5 m-3 bg-[#1f2937] shadow rounded-md px-10">
                                <p>Course Name</p>
                                <p>Durations</p>
                                <p>Progress</p>
                           </div>
                           
                             {/* course card */}
                            {
                                enrolledCourses.map((course,index)=>(
                                    <div className="grid grid-cols-3 bg-[#1f2937] shadow rounded-md px-10 m-3 p-5">
                                        <div>
                                            <img src={course.thumbnail} loading="lazy" alt={`image`} className=""/>
                                            <div>
                                                <p>{course.courseName}</p>
                                                <p>{course.description}</p>
                                            </div>

                                        </div>
                                        <div>
                                            {course?.totalDuration}
                                        </div>
                                        <div>
                                            <p>Progress : {course.progressPercentage || 0}%</p>
                                            <ProgressBar completed={course.progressPercentage || 0}
                                            height="8px"
                                            isLabelVisible={false}/>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                       
                     
                    )

                }
    
        </div>
    )
}
export default EnrolledCourses;