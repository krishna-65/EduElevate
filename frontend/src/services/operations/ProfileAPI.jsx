import { enqueueSnackbar } from "notistack"
import { apiConnector } from "../api-connector";
import { profileEndpoints, settingsEndpoints } from "../api";
import { setCourseEntireData } from "../../store/reducers/viewCourse-reducers";
import { setUser } from "../../store/reducers/profile-reducers";
import { setCourse } from "../../store/reducers/course-reducers";

export const getUserEnrolledCourse = (token,enq) => {
    return async(dispatch)=>{
        enqueueSnackbar("Loading", {variant: 'loading'});
        let result =[];
        try{
                const response = await apiConnector("Get", profileEndpoints.GET_USER_ENROLLED_COURSES_API,null)
                if(!response?.data?.success){
                    throw new Error(response?.data?.message);
                }
                
                enqueueSnackbar("Courses Fetched", {variant: 'success'});
        }catch(error){
            console.log(error?.data?.message)
            // enqueueSnackbar("Unable to fetch course", {variant: 'error'});
        }
    }
}

export const getInstructorData = async(enqueueSnackbar) => {
  
        enqueueSnackbar("Loading", {variant: 'loading'});
        let result = [];
        try{
            const response = await apiConnector('GET', profileEndpoints.GET_INSTRUCTOR_DATA_API,null)
            result = response?.data?.courses;
           // console.log(response?.data)
            setCourse(result);
            return result;
        }catch(error){
      //  console.log("GET_INSTRUCTOR_DATA_API Error",error);
        enqueueSnackbar(error?.message || "Error"  ,{variant:"error"});
        }
       
    }

// }

// export const getInstructorData =() => {
//     return async(dispatch) => {
//     let result = [];
//     try{
//         result = await apiConnector("GET",profileEndpoints.GET_INSTRUCTOR_DATA_API,null);
//         console.log("Get User Course API Response: " ,result?.data?.coursesDetails);
//         if(!result?.data?.success){
//             throw new Error("Couldn't get user course")
//         }
//         dispatch(setCourseEntireData( result?.data?.coursesDetails));
//     }catch(error){
//         console.log("Get User Course API error: " + error)
//     }
// }
// }

export const updateProfile = async(data) => {
    try{
        const response = await apiConnector('PUT',settingsEndpoints.UPDATE_PROFILE_API,data);
        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        setUser(response?.updatedUser);
        return response?.data;
    }catch(error){
        console.log("UPDATE_PROFILE_API Error", error);
    }
}

export const updateProfilePicture = async(data)=>{
    try{
        const response = await apiConnector('PUT', settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,data);
        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }
       // console.log(response.data);
        setUser(response?.updatedUser);
        return response?.data;
    }catch(error){
        console.log("UPDATE_PROFILE_PICTURE_API Error", error);
    }
}