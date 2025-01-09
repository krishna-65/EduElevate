import React, { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import Aos from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import Loader from "../components/common/Loader";
import { h1 } from "framer-motion/client";

const UpdatePassword = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const {loading} = useSelector((state)=>state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const gradientStyle = isHovering
    ? {
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2), rgba(15, 15, 15, 0.5))`,
      }
    : {};

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
  console.log("hi");
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    if(formData.password !== formData.confirmPassword)
      enqueueSnackbar("Passwords do not match", { variant: "error" });
    else if(formData.password.length < 6)
      enqueueSnackbar("Password must be at least 6 characters", { variant: "error" });
    else
    dispatch(resetPassword(formData,token,enqueueSnackbar));
    
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex justify-center items-center">
          {
            loading ? 
             (<Loader/>) 
             :(
                  <div
                  className="w-11/12 md:w-[40%] p-6 md:p-10 rounded-3xl shadow-lg bg-[#1f1f1f] text-white"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  style={gradientStyle}
                  data-aos="fade-down"
                >
                  <h2
                    className="text-2xl sm:text-4xl font-bold mb-4"
                    data-aos="zoom-in"
                  >
                    Choose new password
                  </h2>
                  <p className="text-sm sm:text-md text-gray-400 mb-6">
                    Almost done! Enter your new password and you're all set.
                  </p>
          
                  <form onSubmit={handleOnSubmit} className="space-y-6">
                    {/* Password Input */}
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full text-sm sm:text-md p-3 rounded-md bg-[#333] text-white mb-4"
                        placeholder="New Password"
                        name="password"
                        value={formData.password}
                        onChange={handleOnChange}
                        required
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-4 text-white cursor-pointer"
                      >
                        {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
                      </span>
                    </div>
          
                    {/* Confirm Password Input */}
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full text-sm sm:text-md p-3 rounded-md bg-[#333] text-white"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleOnChange}
                        required
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-4 text-white cursor-pointer"
                      >
                        {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
                      </span>
                    </div>
          
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#6d2a9c] py-3 rounded-md hover:bg-[#5a2380] transition-colors duration-300"
                    >
                      Reset Password
                    </button>
                  </form>
                </div>
             )
          }
    </div>
  );
};

export default UpdatePassword;
