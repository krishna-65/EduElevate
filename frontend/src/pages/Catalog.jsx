import { Link, useParams } from "react-router-dom";
import Navbar from "../components/common/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {  getCategoryPageDetails } from "../services/operations/courseAPI";
import CourseCart from "../components/common/CourseCart";
import Footer from "../components/Footer";
import Loader from "../components/common/Loader";

const Catalog = ()=>{
   
    const { name } = useParams();
    const [selectedCategory, setSelectedCategory] = useState(); 
    const [courses,setCourses] = useState(null);
    const dispatch = useDispatch();
    
    const formattedName = name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    const { categories } = useSelector((state) => state.category);
    
    
    useEffect(()=>{
        const filteredCategory = categories?.filter(
            (category) => category.name === formattedName
          );
          setSelectedCategory(filteredCategory[0]);
    },[name])

    const [loading,setLoading] = useState(false);
    
   useEffect(()=>{
       const getCourses = async()=>{  
        setLoading(true);
        const  response = await getCategoryPageDetails(selectedCategory._id);
        setCourses(response);
        setLoading(false);
       }
       getCourses();
   },[selectedCategory]);
   console.log(courses)
 
    return(
        <>
            <Navbar/>
    
            <div className="mt-32 p-10 pb-32 bg-[#161515]">
                    <h1 className="text-white"><Link to='/'>Home</Link> / Catalog / <span className="text-[#6674CC]">{selectedCategory?.name}</span></h1>
                    <span className="text-[#6674CC] text-lg leading-10 font-semibold">{selectedCategory?.name}</span>
                    <p className="text-gray-400 text-lg">{selectedCategory?.description}</p>
            </div>
           {
            loading ?( <Loader/>) :
            courses &&
              <>  <div className="p-10">
                    <p className="text-2xl font-semibold">{selectedCategory?.name}</p>
                    {courses?.selectCategoryCourses?.course.length>0? (
                    <div className=" mx-auto grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-8 py-10 text-white rounded-3xl">
                  {  courses.selectCategoryCourses.course.map((c, index) => (
                        <CourseCart key={index} data={c} />
                    ))}
                         </div>) : (
                    <div className="my-10 text-center">
                       <p className="text-stone-400 "> No courses found in this category.</p></div>
                    )}

                     
                  </div>
                  
           

                <div className="p-10">
                <p className="text-2xl font-semibold">{selectedCategory?.name}</p>
                <div className=" mx-auto grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-8 py-10 text-white rounded-3xl">
                {courses?.topSellingCourses?.map((c, index) => (
                        <CourseCart key={index} data={c}/>
                    ))}
                
                </div>
                </div>
               </> 
           }
        <Footer/>
        </>
    )
}
export default Catalog;