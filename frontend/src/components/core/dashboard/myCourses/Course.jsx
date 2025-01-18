import { useEffect } from "react";
import Aos from "aos";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
const Course = ({course,handleEdit})=>{
    useEffect(()=>{
        Aos.init({duration:1000})
    },[])
    return(
        <div className="shadow bg-[#161515] w-full p-5 flex gap-10 justify-between md:flex-row flex-col" >
            <div className="flex gap-10 lg:flex-row flex-col">
                <img src={course.thumbnail} alt={course.courseName} className="object-contain w-full lg:w-[200px] rounded shadow"/>
                <div className="p-3">
                <h2 className="text-xl font-semibold ">{course.courseName}</h2>
                <p className="text-sm">{course.courseDescription}</p>
                <p className={`text-sm  ${course.status === "Published" ?"text-yellow-400":"text-teal-500"}`}>{course.status}</p>
            </div>
            </div>
           
            <div className="flex p-3  gap-7 justify-center items-center ">
                {/* <Link
                        to={`/catalog/${course.category.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}/${course._id}`}
                         className="px-9 py-2 bg-yellow-400 text-gray-600 font-semibold rounded hover:scale-95 text-center transition-all duration-200">View</Link> */}
                        <p className="text-2xl text-blue-400">RS.{course.price}</p>
                <button 
                  onClick={() => handleEdit(course)}
                className="text-2xl text-yellow-500 font-semibold rounded hover:scale-95 transition-all duration-200"><MdModeEdit /></button>
            </div>
        </div>
    )
}
export default Course;