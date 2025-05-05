
import { setLoading, setIsauthenticate, setSignupData } from '../../store/reducers/auth-reducer';
import { apiConnector } from '../api-connector';
import { authEndpoints, profileEndpoints } from '../api';
import { setUser } from '../../store/reducers/profile-reducers';
const {
    SENDOTP_API
}    = authEndpoints;
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

export const sendOtp = (email,navigate,enqueueSnackbar) =>{

    
    return (
        async (dispatch) => {

            dispatch(setLoading(true));

                enqueueSnackbar('Sending OTP...', {variant: 'info', autoHideDuration:1500})

                try{
                    const response = await apiConnector("POST",SENDOTP_API, {
                        email,
                        checkUserPresent:true,
                    })
                   // console.log("Send OTP API response..........", response)
                    //console.log(response.data.success)

                    if(!response.data.success){
                        throw new Error(response.data.message);
                    }

                    navigate('/verify-email');
                    enqueueSnackbar('OTP Sent Successfully',{variant: 'success', autoHideDuration:2000})
                
                }catch(error){
                   // console.log("Send OTP API error........", error);
                    enqueueSnackbar(error.response.data.message, {variant: "error", autoHideDuration:2000})
                }
                dispatch(setLoading(false));
        }
    )
}

export const sigUp = 
(
   formData,
    navigate,
    enqueueSnackbar
) => {
    return(
        async (dispatch) => {
            enqueueSnackbar("Loading...", {varient:"info"})
            dispatch(setLoading(true));
            try{
                const response = await apiConnector('POST',authEndpoints.SIGNUP_API,{
                    formData
                })
                //console.log("Signup API Response......", response)

                if(!response.data.success){
                    throw new Error(response.data.message);
                }
                enqueueSnackbar(response?.data?.message||"Signup Success", {varient:"success"}) 
                navigate('/login')
            }catch(error){
                // console.log("Signup API Error....", error);
                enqueueSnackbar(error?.data?.message||"Signup Failed", {varient:"error"})
              
            }
            dispatch(setLoading(false));
            }
    )
}


export const login = (formData, navigate, enqueueSnackbar) => {
    return async (dispatch) => {
      // Dispatch loading state to indicate the process has started
      dispatch(setLoading(true));
      enqueueSnackbar("Loading...", { variant: "loading" });
  
      try {
        const { email, password } = formData;
        // Send request to backend API for login
        const response = await apiConnector('POST',authEndpoints.LOGIN_API, {
          email,
          password
        },);
  
       // console.log("Login API Response.....", response);
        
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        // Handle success, setting authentication state
        enqueueSnackbar(response?.data?.message || "Login Success", { variant: "success" });
  
        // Store authentication data in redux
        dispatch(setIsauthenticate({ isauthenticate: true, expireTime: response.data.expireTime }));
        dispatch(setUser(response.data.user));
  
        // Redirect to dashboard after successful login
        navigate('/dashboard');
  
      } catch (error) {
       // console.log("Login API Error....", error);
        enqueueSnackbar(error?.data?.message || "Login Failed", { variant: "error" });
        navigate('/login');
      }
  
      // Reset loading state after the process ends
      dispatch(setLoading(false));
    };
  };


  export const googleLogin = (token, navigate, enqueueSnackbar) => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      enqueueSnackbar("Logging in with Google...", { variant: "info" });
  
      try {
        // Call backend API with Firebase token and accountType
        const response = await  apiConnector("POST", authEndpoints.GOOGLE_LOGIN_API, {
            token,
           
          });
        //  axios.post("http://localhost:8000/api/v1/auth/google-login",{
        //     token,
        // })
       
  
       // console.log("Google Login Response:", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        enqueueSnackbar(response?.data?.message || "Login Success", { variant: "success" });
  
        // Update Redux state
        dispatch(setIsauthenticate({
          isauthenticate: true,
          expireTime: response.data.expiresTime,
        }));
        dispatch(setUser(response.data.user));
  
        // Navigate to dashboard
        navigate('/dashboard');
      } catch (error) {
       // console.error("Google Login Error:", error);
        enqueueSnackbar(error?.response?.data?.message || "Google Login Failed", { variant: "error" });
        navigate('/login');
      }
  
      dispatch(setLoading(false));
    };
  };
  
  export const googleSignup = 
(
   {token,accountType,
    navigate,
    enqueueSnackbar}
) => {
    return(
        async (dispatch) => {
            enqueueSnackbar("Loading...", {varient:"info"})
            dispatch(setLoading(true));
            try{
                const response = await apiConnector('POST',authEndpoints. GOOGLE_SINGUP_API,{
                    token,
                    accountType
                })


                if(!response.data.success){
                    throw new Error(response.data.message);
                }
                enqueueSnackbar(response?.data?.message||"Signup Success", {varient:"success"}) 
                navigate('/login')
            }catch(error){
                //  console.log("Signup API Error....", error);
                enqueueSnackbar(error?.data?.message||"Signup Failed", {varient:"error"})
              
            }
            dispatch(setLoading(false));
            }
    )
}

export const logout =  (navigate,enqueueSnackbar) => {
    return async(dispatch) => {
            dispatch(setLoading(true));
            try{
                const response = await apiConnector('POST', authEndpoints.LOGOUT_API)
                // console.log("Logout API Response.....", response)
                if(!response.data.success){
                    throw new Error(response.data.message)
                }
                dispatch(setIsauthenticate(false,null));
                dispatch(setUser(null));
                dispatch(setLoading(false));
                enqueueSnackbar("Logout Success", {varient:"success"})
                navigate('/login');
            }
            catch(error){
                // console.log("Logout API Error....", error);
                enqueueSnackbar("Failed to Logout", {varient:"error"})
                dispatch(setLoading(false));
            }
    }
}

export const getPasswordResetToken = (email,setEmailSent,enqueueSnackbar) => {
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await apiConnector('POST', authEndpoints. RESETPASSTOKEN_API,{
                email
            })
            // console.log("Get Password Reset Token API Response.....", response)
            if(!response.data.success){
                throw new Error(response.data.message)
                enqueueSnackbar(response.response.data.message , {varient:"error"})
            }
            enqueueSnackbar("Reset Password Link Sent", {varient:"success"}) 
            setEmailSent(true);

   

    }catch(error){
        // console.log("Get Password Reset Token API Error....", error);
        enqueueSnackbar("Failed to Send Reset Password Link", {varient:"error"})
        enqueueSnackbar(error.response.data.message , {varient:"error"})
    }
    dispatch(setLoading(false));
}
}

export const resetPassword = (formData, token, enqueueSnackbar) => {
    return async(dispatch)=>{
        const {password, confirmPassword} = formData;
          dispatch(setLoading(true));
        try{
            const response = await apiConnector('POST', authEndpoints.RESETPASSWORD_API,{
                password,
                confirmPassword,
                token
            })
            // console.log("Reset Password API Response.....", response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            enqueueSnackbar("Password Reset Successfully", {varient:"success"}) 
            navigate('/login')
            }catch(error){
                // console.log("Reset Password API Error....", error);
                enqueueSnackbar("Failed to Reset Password", {variant:"error"})
                enqueueSnackbar(error.response.data.message,{variant:"error"})

            }
            dispatch(setLoading(false));
    }
}

const verify_email = (otp) => {
   return async (dispatch)=> {
            dispatch(setLoading(true));
        try{
           
        }catch(Error){}
    }
}

export const verifySession = () => {
    return async (dispatch) => {
        dispatch(setLoading(true)); // Start loading
        try {
            const response = await apiConnector("GET", profileEndpoints.GET_USER_DETAILS_API, {});
            // console.log("Verify Session API Response.....", response);

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            // Update Redux state if the user is authenticated
            dispatch(setIsauthenticate({ isauthenticate: true, expireTime: null }));
            dispatch(setUser(response.data.user));
        } catch (error) {
            // console.error("Verify Session API Error....", error);
            // Update Redux state to mark as unauthenticated
            dispatch(setIsauthenticate({ isauthenticate: false }));
        } finally {
            dispatch(setLoading(false)); // Stop loading
        }
    };
};
