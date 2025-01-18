
import CourseCart from "./common/CourseCart";
import { useEffect, useState } from "react";
import { getALLCourses } from "../services/operations/courseAPI";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./common/Loader";
import { setCourse } from "../store/reducers/course-reducers";

const Courses = ()=>{

  const dispatch = useDispatch();
   useEffect(()=>{
    const getCourses = async()=>{
      try{
        setLoading(true);
        const response = await getALLCourses();
        dispatch(setCourse(response));
       
      }catch(error){
        console.error(error);
      }
      finally{
        setLoading(false);
      }
    }
    getCourses();
   },[])

   const {course} = useSelector((state)=>state.course)

const [mousePos,setMousePos] = useState({x: 0, y: 0});
const [isHovering, setIsHovering] = useState(false);
const [loading,setLoading] = useState(false);
const handleMouseMove = (e)=>{
    const {left,top,width,height} = e.target.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({x, y});
}
const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };


   const gradientStyle = isHovering ?
                            { background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #382927, #0f0f0f, #010101)`}
                            : {};

      if(loading) return <Loader/>
    
    return(
        <div className="w-full bg-[#0f0f0f] my-14">
            
            <div className="w-11/12 mx-auto py-20 text-white rounded-3xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            
            >
                    <h2 className="text-center font-semibold text-4xl">Courses</h2>
                   <div className=" mx-auto grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-8 py-10 text-white rounded-3xl">
            {course && course.map((data)=><CourseCart data={data}
            style={gradientStyle}/>)}
                </div>
            </div>

        </div>
    )
}
export default Courses;