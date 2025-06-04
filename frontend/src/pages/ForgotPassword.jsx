import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { getPasswordResetToken } from "../services/operations/authAPI";
import { useSnackbar } from "notistack";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Initialize animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // Debug when emailSent changes
  useEffect(() => {
    console.log("Email sent status:", emailSent);
  }, [emailSent]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent, enqueueSnackbar));
  };

  return (
    <div className="flex w-screen flex-row items-center min-h-screen justify-center">
      {
        loading ? (
          <div data-aos="zoom-in">Loading...</div>
        ) : (
          <div className="flex flex-col items-center" data-aos="zoom-in">
            <h1 className="text-center font-bold text-6xl text-gray-200 my-2">
              {!emailSent ? "Reset Your Password" : "Check your email"}
            </h1>
            <p className="p-3 text-md text-center">
              {
                !emailSent
                  ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery."
                  : `We have sent the reset email to ${email}`
              }
            </p>
            <form onSubmit={handleOnSubmit} className="w-[40%] flex flex-col items-center">
              {
                !emailSent && (
                  <label className="w-full mt-7">
                    <p className="text-sm p-1">Email Address:</p>
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-1 w-full px-4 py-2 rounded-lg focus:ring bg-[#333] focus:ring-blue-200 focus:outline-none"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                )
              }
              <button type="submit" className="mt-4 px-7 py-2 text-center bg-blue-600 hover:scale-90 transition-all duration-200 rounded-md">
                {!emailSent ? "Reset Email" : "Resend Email"}
              </button>
            </form>
            <div className="mt-4">
              <Link to="/login" className="text-gray-200 hover:scale-95 transition-all duration-200">
                <FaArrowLeft className="inline-block mr-2 text-sm" />Back to Login
              </Link>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ForgotPassword;
