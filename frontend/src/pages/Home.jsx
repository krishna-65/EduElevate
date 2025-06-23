// Icons Import
import { Link } from "react-router-dom"
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

// Image and Video Import
import Banner from "../assets/Images/banner.mp4"
// Component Imports
import Footer from "../components/common/Footer"
import Logo from "../components/common/Logo"
import SocialMedia from "../components/Home/SocialMedia"
import Testimonial from "../components/Home/Testimonials"
import Success from "../components/Home/success"
import ContactUsForm from "../components/ContactPage/ContactUsForm"
import FAQSection from "../components/Home/FAQ";

function Home() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const users = [
    { name: 'Krishna', img: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Mahima', img: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Shubham', img: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'Kartik', img: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { name: 'Rahul', img: 'https://randomuser.me/api/portraits/men/5.jpg' }
  ];

  return (
    <div>
      {/* Section 1 */}
       <div className="bg-grid flex flex-col  md:flex-row flex-justify-between w-11/12 mx-auto p-5 text-center my-12" data-aos="zoom-in">
            <div className='w-[100%] md:w-[50%] flex '>
            <div className='h-[60vh] sm:mt-8 w-2 bg-gradient-to-b from-[#8a36ca] via-[#354466] to-[#0c0c0e] rounded-full shadow-[-0px_0_60px_#8a36ca] mx-0 -z-10' data-aos="fade-down"></div>
                    <div className=' -ml-5 flex flex-col justify-center items-center'>
                    <h1 className="text-3xl sm:text-5xl font-bold mb-6">Crack the Code to Success   with <Logo className={`inline-block text-3xl sm:text-5xl`}/></h1>
               <p className="text-gray-400 mb-8">Elevate your programming skills, solve challenges, and unlock the world of coding possibilities.</p>
               <div className="flex sm:flex-row flex-col space-y-8  justify-center sm:space-x-4">
              
              <Link to='/courses' className="bg-blue-600 px-6 py-3 rounded-md text-xl z-10  hover:cursor-pointer hover:scale-95 transition-all duration-200 h-fit mt-9">View Courses</Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="border border-red-400 px-6 py-3 rounded-md text-red-500 text-xl hover:cursor-pointer hover:scale-95 transition-all duration-200 z-10"
              >
                Watch Video Live
              </button>

              
          </div>
            <div className="w-[90%] sm:w-fit flex justify-center items-center sm:-space-x-4 my-8 bg-[#0f0f0f] border border-red-400 py-2  rounded-full px-4 sm:px-8">
            {users.map((user, index) => (
              <div key={index} className="relative group">
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-10 hidden sm:block h-10 rounded-full border-2 border-gray-300 group-hover:scale-110 transition-transform duration-300 hover:cursor-pointer"
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-[#0f0f0f] text-white text-sm fonr-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {user.name}
                </div>
              </div>
            ))}
              <div className="">
                       <span className='text-center text-sm sm:text-md sm:ml-8'> 50000+ Students</span>
              </div>
          </div>
                    </div>
            </div>

            <div className="w-[100%] md:w-[50%] h-fit my-auto md:ml-10 py-5 grid grid-cols-1 md:grid-cols-2  gap-8 text-center">

            <div className="relative inline-block p-[2px] bg-gradient-to-r from-[#6674CC] via-purple-500 to-orange-500 rounded-md">
            <button className="bg-black text-white p-4 font-semibold rounded-md relative z-10 w-full">Free Web Dev</button></div>
            <div className="relative inline-block p-[2px] bg-gradient-to-r from-[#6674CC] via-purple-500 to-orange-500 rounded-md">
            <button className="bg-black text-white p-4 font-semibold rounded-md relative z-10 w-full">Quick Compiler</button></div>

            <div className="relative inline-block p-[2px] bg-gradient-to-r from-[#6674CC] via-purple-500 to-orange-500 rounded-md">
            <button className="bg-black text-white p-4 font-semibold rounded-md relative z-10 w-full">Tutorials</button> </div>


            <div className="relative inline-block p-[2px] bg-gradient-to-r from-[#6674CC] via-purple-500 to-orange-500 rounded-md">
            <button className="bg-black text-white p-4 font-semibold rounded-md relative z-10 w-full">Dev Challenges</button></div>
            <div className="relative inline-block p-[2px] bg-gradient-to-r from-[#6674CC] via-purple-500 to-orange-500 rounded-md">
            <button className="bg-black text-white p-4 font-semibold rounded-md relative z-10 w-full">Mock Tests</button></div>
            <div className="relative inline-block p-[2px] bg-gradient-to-r from-[#6674CC] via-purple-500 to-orange-500 rounded-md">
            <button className="bg-black text-white p-4 font-semibold rounded-md relative z-10 w-full">Articles</button></div>
            <div className="relative inline-block p-[2px] bg-gradient-to-r from-[#6674CC] via-purple-500 to-orange-500 rounded-md">
            <button className="bg-black text-white p-4 font-semibold rounded-md relative z-10 w-full">Interview Experiences</button></div>

            <div className="relative inline-block p-[2px] bg-gradient-to-r from-[#6674CC] via-purple-500 to-orange-500 rounded-md">
            <button className="bg-black text-white p-4 font-semibold rounded-md relative z-10 w-full">Core CS Subjects</button></div>


        
        </div>

        </div>

         {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-70">
          <div className="relative bg-[#121212] rounded-lg shadow-lg p-4 w-[90%] max-w-3xl">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-white text-2xl hover:text-red-500 transition-all"
              onClick={() => setIsModalOpen(false)}
            >
              <AiOutlineClose />
            </button>

            {/* Video */}
            <video src={Banner} controls autoPlay className="rounded-md w-full h-auto mt-6" />
          </div>
        </div>
      )}

      {/* Section 2 */}
      <SocialMedia/>
      <Success/>
      <Testimonial/>
      <FAQSection/>
      <ContactUsForm/>
  
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home