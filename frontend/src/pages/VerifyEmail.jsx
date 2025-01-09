import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Loader from "../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { sigUp } from "../services/operations/authAPI";
import { enqueueSnackbar } from "notistack";
import { clearSignupData } from "../store/reducers/auth-reducer";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array for 6-digit OTP
  const {loading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
   const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus next input
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput && nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput && prevInput.focus();
    }
  };

  const data = useSelector((state)=> state.auth.signup);
  console.log("data in signup component:", data);


 
  const handleOtpSubmit = (event) => {
    event.preventDefault();
 
    if (!data) {
        enqueueSnackbar('Signup data not found. Please try again.', { variant: 'error' });
        navigate('/signup'); 
        return;
    }

    const otpCode = otp.join("");
    console.log(otpCode);
    const formData = { ...data, otp: otpCode };
    console.log(formData);
  dispatch(sigUp(formData,navigate,enqueueSnackbar))
dispatch(clearSignupData()); // Clear signup data after success
};

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-white">
        {
        loading ? (<Loader/>)
        :(
                <div
                className="bg-[#1f1f1f] p-8 rounded-2xl shadow-lg w-11/12 max-w-md"
                data-aos="fade-up"
            >
                <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
                <p className="text-gray-400 mb-6">
                Enter the 6-digit code sent to your email.
                </p>
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex gap-2 justify-center">
                    {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-8 h-8 sm:w-12 sm:h-12 text-center inline-block text-xl rounded-md bg-[#333] border border-gray-500 focus:outline-none focus:border-blue-400"
                    />
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#6d2a9c] py-3 rounded-md font-semibold"
                   
                >
                   Verify OTP
                </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-400">
                Didn't receive the code?{" "}
                <button
                    className="text-blue-400 hover:underline"
                >
                    Resend OTP
                </button>
                </p>
            </div>
        )
        }
    </div>
  );
};

export default OtpVerification;
