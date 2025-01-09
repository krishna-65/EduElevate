import { useEffect } from "react";
import Aos from "aos";
const Course = ({course,handleEdit})=>{
    useEffect(()=>{
        Aos.init({duration:1000})
    },[])
    return(
        <div className="shadow bg-[#161515] w-full p-5 flex gap-10 justify-between" >
            <div className="flex gap-10">
                <img src={course.thumbnail} alt={course.courseName} className="object-contain w-[200px] rounded shadow"/>
                <div className="p-3">
                <h2 className="text-xl font-semibold ">{course.courseName}</h2>
                <p className="text-sm">{course.courseDescription}</p>
            </div>
            </div>
           
            <div className="flex p-3 flex-col gap-5 justify-center ">
                <button className="px-9 py-2 bg-yellow-400 text-gray-600 font-semibold rounded hover:scale-95 transition-all duration-200">View</button>
                <button 
                  onClick={() => handleEdit(course)}
                className="px-9 py-2 bg-blue-400 text-gray-100 font-semibold rounded hover:scale-95 transition-all duration-200">Edit</button>
            </div>
        </div>
    )
}
export default Course;