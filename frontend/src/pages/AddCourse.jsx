import { motion } from "framer-motion";
import Navbar from "../components/common/Nav";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaBookReader, FaCalendarAlt } from "react-icons/fa";
import { HiRocketLaunch } from "react-icons/hi2";
const AddCoursePage = () => {

    
    useEffect(()=>{
        Aos.init({duration:1000})
    },[])

    const [mousePos,setMousePos] = useState({x: 0, y: 0});
    const [isHovering, setIsHovering] = useState(false);

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

    const gradientStyle =  isHovering ?  { background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2),rgba(15, 15, 15, 0.5)`} : {};


    return (
        <div className="min-h-screen  flex flex-col">
            {/* Navbar */}
            <Navbar />

          <div className=" flex justify-between">
                    {/* left Section */}
                      
                        <div  className="w-[90%] my-20 md:w-1/2 md:px-8  flex  flex-col justify-center space-y-6 md:pl-12 mx-auto"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                            <div className={`bg-[#1f1f1f]   flex flex-col justify-center  text-white  p-6 rounded-3xl shadow-lg`}
                            style={gradientStyle} data-aos="fade-down">
                            <div className="text-lg sm:text-2xl flex items-center text-blue-400 font-semibold mb-2 gap-3 sm:gap-6"  data-aos="zoom-in">
                                <h2 className='rounded-full border p-3 border-blue-400'><FaBookReader /></h2>
                            <span>  Learn: Access 100+ Courses</span></div>
                            </div>

                        

                            <div className={`bg-[#1f1f1f]  flex flex-col justify-center  text-white  p-6 rounded-3xl shadow-lg`}
                            style={gradientStyle} data-aos="fade-down">
                            <div className="sm:text-2xl flex items-center text-red-400 font-semibold mb-2 text-lg gap-3 sm:gap-6"  data-aos="zoom-in">
                            <h2 className='rounded-full border p-3 border-red-400'><FaCalendarAlt /></h2>

                                <span>Apply: Build, Play, Create</span>
                            </div>
                        </div>
                        

                            <div className={`bg-[#1f1f1f]  flex flex-col justify-center  text-white p-6 rounded-3xl shadow-lg`}
                            style={gradientStyle} data-aos="fade-down">
                            <div className="flex sm:gap-6 sm:text-2xl text-lg gap-3 text-green-400 font-semibold mb-2 items-center" data-aos='zoom-in'>
                                <h2 className='border p-3 rounded-full border-green-400'><HiRocketLaunch/></h2>
                                <span>Grow: Elevate Your Career</span>
                                </div>
                            </div>
                        </div>
                    {/* right section */}
                               
                        <div className="flex-grow flex  items-center justify-center px-4 py-12 rounded-2xl mt-10"
                          onMouseMove={handleMouseMove}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className=" rounded-lg shadow-lg p-10 w-full max-w-xl bg-[#1f1f1f]"
                            >
                                <h2 className="text-center text-3xl font-bold text-white">
                                    Add New Course
                                </h2>
                                <p className="text-center text-sm text-white  mb-6">
                                    Create a course by filling out the information below.
                                </p>

                                <form className="">
                                    <div className="mb-4">
                                        <label
                                            htmlFor="courseName"
                                            className="block text-sm font-medium text-white"
                                        >
                                            Course Name
                                        </label>
                                        <input
                                            type="text"
                                            id="courseName"
                                            placeholder="Enter course name"
                                            className="w-full text-sm sm:text-md p-3 rounded-md bg-[#333] text-white mb-4"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium text-white"
                                        >
                                            Course Description
                                        </label>
                                        <textarea
                                            id="description"
                                            rows="4"
                                            placeholder="Enter course description"
                                            className="w-full text-sm sm:text-md p-3 rounded-md bg-[#333] text-white mb-4"
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="price"
                                            className="block text-sm font-medium text-white"
                                        >
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            id="price"
                                            placeholder="Enter price in USD"
                                            className="w-full text-sm sm:text-md p-3 rounded-md bg-[#333] text-white mb-4"
                                            required
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 0.95 }}
                                        whileTap={{ scale: 0.80 }}
                                        type="submit"
                                        className="w-full bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
                                    >
                                        Add Course
                                    </motion.button>
                                </form>
                            </motion.div>
                        </div>
          </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AddCoursePage;
