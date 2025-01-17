import React, { useEffect, useState } from 'react';
import Navbar from './common/Nav';
import { HiRocketLaunch } from "react-icons/hi2";
import { FaCalendarAlt, FaEye } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../services/operations/authAPI';
import { useSnackbar } from 'notistack';
import { setSignupData } from '../store/reducers/auth-reducer';
import Loader from './common/Loader';
import { TbEyeClosed } from 'react-icons/tb';

const SignupComponent = ({backgroundColor,textColor}) => {

    useEffect(()=>{
        Aos.init({duration:1000})
    },[])
    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const {enqueueSnackbar}  = useSnackbar();
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
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:'',
            accountType:'Student',
            otp:'',

        })
        const [passwordHidden, setPasswordHidden] = useState(false);
        const handlePasswordVisibility =()=>{
            setPasswordHidden(!passwordHidden);
        }

        const handleChange = (e) => {
            setFormData({...formData, [e.target.name]: e.target.value })
        }
   
        const handleAccountTypeChange = (event) => {
            setFormData((prevFormData) => ({
                ...prevFormData,
                accountType: event,
            }));
        };
     
        const [loading,setLoading] = useState(false);

        const handleSubmit = async(event)=>{
            // Send email to user
            event.preventDefault();
            dispatch(setSignupData(formData));
            setLoading(true);
            await dispatch(sendOtp(formData.email,navigate,enqueueSnackbar ));
             setLoading(false);
        }
       

        if(loading) return <Loader/>

    
  return (
    <div className={`min-h-screen bg-[#0f0f0f] ${backgroundColor}`}>

    <div className='w-11/12 pt-28  flex md:flex-row flex-col justify-between mx-auto'>
          {/* Left Section */}
                <div className="w-[90%] my-20 md:w-[40%] md:px-8  flex  flex-col justify-center space-y-6 md:pl-12 mx-auto"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                      {/* Informational Cards */}
                    {['Learn', 'Apply', 'Grow'].map((text, index) => (
                        <div
                        key={index}
                        className={`bg-[#1f1f1f] ${backgroundColor} flex flex-col justify-center text-white ${textColor} p-6 rounded-3xl shadow-lg`}
                        style={gradientStyle}
                        data-aos="fade-down"
                        >
                        <div className="text-lg sm:text-xl flex items-center gap-3 sm:gap-6 font-semibold mb-2">
                            <h2 className={`rounded-full border p-3 ${index === 0 ? 'border-blue-400 text-blue-400' : index === 1 ? 'border-red-400 text-red-400' : 'border-green-400 text-green-400'}`}>
                            {index === 0 ? <FaBookReader /> : index === 1 ? <FaCalendarAlt /> : <HiRocketLaunch />}
                            </h2>
                            <span>{text}: {index === 0 ? 'Access 100+ Courses' : index === 1 ? 'Build, Play, Create' : 'Elevate Your Career'}</span>
                        </div>
                        </div>
                    ))}
                </div>

                {/* Right Section - Login Form */}
                <form onSubmit={handleSubmit} className="w-[100%] md:w-[60%] flex justify-center items-center  text-white" data-aos="fade-down"
                       onMouseMove={handleMouseMove}
                       onMouseEnter={handleMouseEnter}
                       onMouseLeave={handleMouseLeave}>
                    <div className={`bg-[#2a2a2a] ${backgroundColor} p-3 py-8 sm:p-10 rounded-3xl shadow-lg w-[100%] sm:w-[80%] ${textColor} md:w-[100%]`} data-aos="zoom-in">
                    <h2 className="text-xl sm:text-3xl font-bold mb-6">Secure Access Made Simple</h2>

                        <div className="flex bg-[#333] rounded-3xl mb-4 p-2  shadow-md border-2 border-[#242424]">
                           
                            <button
                                onClick={() => handleAccountTypeChange('Student')}
                                className={`${
                                    formData.accountType === 'Student' ? 'bg-[#2a2a2a] text-white scale-105' : 'bg-transparent text-gray-400'
                                } font-semibold text-xl w-1/2 text-center cursor-pointer transition-all duration-300 ease-in-out p-3 ml-2 rounded-2xl`}
                            >
                                Student
                            </button>

                          
                            <button
                                onClick={() => handleAccountTypeChange('Instructor') }
                                className={`${
                                    formData.accountType === 'Instructor' ? 'bg-[#2a2a2a] text-white scale-105' : 'bg-transparent text-gray-400'
                                } font-semibold text-xl w-1/2 text-center cursor-pointer transition-all duration-300 ease-in-out p-3 mr-2 rounded-2xl`}
                            >
                                Instructor
                            </button>
                        </div>

                    
                    <button className="w-full flex text-sm sm:text-md items-center justify-center bg-white text-black py-3 rounded-md mb-4">
                        <FcGoogle className='inline-block mr-2 text-lg'/>
                        Continue with Google
                    </button>
                    
                    <button className="w-full flex items-center text-sm sm:text-md justify-center bg-[#333] text-white py-3 rounded-md mb-4">
                    
                        Continue with GitHub
                    </button>

                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-600" />
                        <span className="px-2 text-gray-400">OR</span>
                        <hr className="flex-grow border-gray-600" />
                    </div>
          
                        
                <div className='flex md:flex-row flex-col justify-between gap-3'>
                        <input
                                type="text"
                                placeholder="Enter your name"
                                className="text-sm sm:text-md w-full p-3 rounded-md bg-[#333] text-white mb-4"
                                required
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                            />

                            <input type="text" 
                            placeholder='Enter your last name'
                            className="text-sm sm:text-md w-full p-3 rounded-md bg-[#333] text-white mb-4"
                            required
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleChange}/>
                </div>
                     
                       

                  
                <div className='flex justify-between gap-2'> 
                        <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full text-sm sm:text-md p-3 rounded-md bg-[#333] text-white mb-4"
                                required
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                </div>
                  <div className='flex md:flex-row flex-col justify-between gap-3'>
                        <div className='relative w-full md:w-[50%]'>
                            <input
                                    // type={passwordHidden?'text':'password'}
                                    type='password'
                                    placeholder="Enter your password"
                                    className="w-full text-sm sm:text-md p-3 rounded-md bg-[#333] text-white mb-4"
                                    required
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {passwordHidden && <FaEye onClick={handlePasswordVisibility} className='absolute right-3 top-4 text-white'/>}
                                {!passwordHidden && <TbEyeClosed onClick={handlePasswordVisibility} className='absolute right-3 top-4 text-white'/>}
                        </div>
                        <div className='relative w-full md:w-[50%]'>
                            <input
                                    type={passwordHidden?'text':'password'}
                                    placeholder="Enter your confirm password"
                                    className="w-full text-sm sm:text-md p-3 rounded-md bg-[#333] text-white mb-4"
                                    name='confirmPassword'
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                               {passwordHidden && <FaEye onClick={handlePasswordVisibility} className='absolute right-3 top-4 text-white'/>}
                               {!passwordHidden && <TbEyeClosed onClick={handlePasswordVisibility} className='absolute right-3 top-4 text-white'/>}
                        </div>
                  </div>
                    
                    <button type='submit' className="w-full bg-red-400 py-3 rounded-md hover:scale-95 transition-all duration-200">Send OTP</button>

                    <Link to='/login'>
                   <p className='text-center text-sm mt-4 hover:text-blue-400'>Already Have an account?</p>
                   </Link>
                    </div>
                </form>
    </div>

    </div>
  );
};

export default SignupComponent;
