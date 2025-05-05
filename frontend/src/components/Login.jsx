import React, { useEffect, useState } from 'react';
import Navbar from './common/Nav';
import { HiRocketLaunch } from "react-icons/hi2";
import { FaCalendarAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin, login } from '../services/operations/authAPI';
import { enqueueSnackbar } from 'notistack';
import Loader from './common/Loader';
import { auth, provider, signInWithPopup } from '../services/firebase';
import axios from 'axios';
const LoginComponent = ({backgroundColor,textColor}) => {

    useEffect(()=>{
        Aos.init({duration:1000})
    },[])
    const [loading,SetLoading] = useState(false);
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

        const [formData, setFormData] = useState({
            email:'',
            password:'',
        })
        const [passwordHidden, setPasswordHidden] = useState(false);
        const handlePasswordVisibility =()=>{
            setPasswordHidden(!passwordHidden);
        }

        const handleChange = (e) => {
            setFormData({...formData, [e.target.name]: e.target.value })
        }
        
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const handleSubmit = async(e) => {
            e.preventDefault();
           dispatch(login(formData,navigate,enqueueSnackbar))
        }

        if(loading){
            return <Loader/>
        }

        const handleGoogleLogin = async () => {
          
              const result = await signInWithPopup(auth, provider);
              const user = result.user;
          
              // Get the ID token from Firebase
              const token = await user.getIdToken();
              dispatch(googleLogin(token,navigate,enqueueSnackbar));
         
             
            
          };
          
        
// const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
  
//       // You can send user info to your backend or Redux
//       enqueueSnackbar(`Welcome ${user.displayName}`, { variant: "success" });
  
//       // Redirect
//       navigate('/');
//     } catch (error) {
//       console.error("Google login error", error);
//       enqueueSnackbar("Google Sign-In Failed", { variant: "error" });
//     }
//   };
  return (
    <div className={`min-h-screen bg-[#0f0f0f] ${backgroundColor}`}>

    <div className='w-11/12 pt-28  flex md:flex-row flex-col justify-between mx-auto'>
          {/* Left Section */}
                <div className="w-[90%] my-20 md:w-1/2 md:px-8  flex  flex-col justify-center space-y-6 md:pl-12 mx-auto"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                    <div className={`bg-[#1f1f1f] ${backgroundColor}  flex flex-col justify-center  text-white ${textColor} p-6 rounded-3xl shadow-lg`}
                    style={gradientStyle} data-aos="fade-down">
                    <div className="text-lg sm:text-2xl flex items-center text-blue-400 font-semibold mb-2 gap-3 sm:gap-6"  data-aos="zoom-in">
                        <h2 className='rounded-full border p-3 border-blue-400'><FaBookReader /></h2>
                      <span>  Learn: Access 100+ Courses</span></div>
                    </div>

                 

                    <div className={`bg-[#1f1f1f] ${backgroundColor}  flex flex-col justify-center  text-white ${textColor} p-6 rounded-3xl shadow-lg`}
                    style={gradientStyle} data-aos="fade-down">
                    <div className="sm:text-2xl flex items-center text-red-400 font-semibold mb-2 text-lg gap-3 sm:gap-6"  data-aos="zoom-in">
                    <h2 className='rounded-full border p-3 border-red-400'><FaCalendarAlt /></h2>

                        <span>Apply: Build, Play, Create</span>
                    </div>
                </div>
                   

                    <div className={`bg-[#1f1f1f] ${backgroundColor}  flex flex-col justify-center  text-white ${textColor} p-6 rounded-3xl shadow-lg`}
                    style={gradientStyle} data-aos="fade-down">
                    <div className="flex sm:gap-6 sm:text-2xl text-lg gap-3 text-green-400 font-semibold mb-2 items-center" data-aos='zoom-in'>
                        <h2 className='border p-3 rounded-full border-green-400'><HiRocketLaunch/></h2>
                        <span>Grow: Elevate Your Career</span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Login Form */}
                <form onSubmit={handleSubmit} className="w-[100%] md:w-1/2 flex justify-center items-center  text-white" data-aos="fade-down">
                    <div className={`bg-[#2a2a2a] ${backgroundColor} p-8 py-16 sm:p-10 rounded-3xl shadow-lg w-[100%] sm:w-[80%] ${textColor} md:w-96`} data-aos="zoom-in">
                    <h2 className="text-xl sm:text-3xl font-bold mb-6">Secure Access Made Simple</h2>

                    
                    <button className="w-full flex text-sm sm:text-md items-center justify-center bg-white text-black py-3 rounded-md mb-4"
                    onClick={handleGoogleLogin}>
                        <FcGoogle className='inline-block mr-1 sm:mr-2 text-lg'/>
                        Continue with Google
                    </button>
                    
                    {/* <button className="w-full flex items-center text-sm sm:text-md justify-center bg-[#333] text-white py-3 rounded-md mb-4">
                    
                        Continue with GitHub
                    </button> */}

                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-600" />
                        <span className="px-2 text-gray-400">OR</span>
                        <hr className="flex-grow border-gray-600" />
                    </div>
          
                        
                           
                     
                       

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full text-sm sm:text-md p-3 rounded-md bg-[#333] text-white mb-4"
                        required
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                  <div className='relative'>
                        <input
                                type={passwordHidden?'text':'password'}
                                placeholder="Enter your password"
                                className="w-full text-sm sm:text-md p-3 rounded-md bg-[#333] text-white mb-4"
                                name='password'
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {!passwordHidden && <FaEyeSlash onClick={handlePasswordVisibility} className='absolute right-3 top-4 text-white'/>}
                            {passwordHidden && <FaEye onClick={handlePasswordVisibility} className='absolute right-3 top-4 text-white'/>}
                  </div>

                  <Link to='/forgotPassword' className='flex justify-end text-sm hover:cursor-pointer'>Forgot Password</Link>
                    
                    <button type='submit' className="w-full bg-[#6d2a9c] py-3 mt-3 rounded-md">LogIn</button>

                  <div className='flex justify-center'>
                  <Link to='/signup'
                   className='text-center cursor-pointer text-sm mt-4'>Don't Have an account?
                   </Link>
                  </div>
                    </div>
                </form>
    </div>

    </div>
  );
};

export default LoginComponent;
