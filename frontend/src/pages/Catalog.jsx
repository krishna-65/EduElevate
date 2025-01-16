import { Link, useParams } from "react-router-dom";
import Navbar from "../components/common/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getALLCourses, getCategoryPageDetails } from "../services/operations/courseAPI";
import { setCourse } from "../store/reducers/course-reducers";

const Catalog = ()=>{
   
    const { name } = useParams();
    const [selectedCategory, setSelectedCategory] = useState(); // Renamed for clarity
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
    
   useEffect(()=>{
       const getCourses = async()=>{
        console.log(selectedCategory);
            const response = await getCategoryPageDetails(selectedCategory._id);
            dispatch(setCourse(response?.courses));
            console.log(response);
       }
       getCourses();
   },[]);

   const {course} =  useSelector((state)=>state.course);
 
   console.log(selectedCategory);

 
    return(
        <>
            <Navbar/>
    
            <div className="mt-32 p-10 pb-32 bg-[#161515]">
                    <h1 className="text-white"><Link to='/'>Home</Link> / Catalog / <span className="text-[#6674CC]">{selectedCategory?.name}</span></h1>
                    <span className="text-[#6674CC] text-lg leading-10 font-semibold">{selectedCategory?.name}</span>
                    <p className="text-gray-400 text-lg">{selectedCategory?.description}</p>
            </div>
        </>
    )
}
export default Catalog;