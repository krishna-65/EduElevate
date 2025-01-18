import { enqueueSnackbar } from "notistack";
import { catalogData, courseEndpoints } from "../api"
import { apiConnector } from "../api-connector"
import { setCourse } from "../../store/reducers/course-reducers";

export const editCourseDetails = async(formData)=>{
    let result = null ;
    try{
       
        const response = await apiConnector("PUT",courseEndpoints.EDIT_COURSE_API,formData)
        console.log("Edit Course Details API Response: " , response);
        if(!response?.data?.success){
            throw new Error("Couldn't edit course details")
        }
        result = response?.data?.course;
        return result;
        }catch(error){
            console.log("Edit Course Details API error: " , error)
        }
        return result;
}

export const addCourseDetails = async(formData) => {
    let result = null ;
    try{
         const response = await apiConnector("POST",courseEndpoints.CREATE_COURSE_API,formData)
      
        console.log("Add Course Details API Response: " , response);
        if(!response?.data?.success){
            throw new Error("Couldn't add course details")
        }
        result = response?.data?.data;
        return result;
        }catch(error){
            console.log("Add Course Details API error: " , error)
        }
      
}

export const fetchCourseDetails = async(courseId,enqueueSnackbar) => {
   let result = null;
    try{
        const response = await apiConnector("GET",  `${courseEndpoints.COURSE_DETAILS_API}?courseId=${courseId}`);
          console.log("COURSE DETAILS API RESPONSE", response);
          if(!response?.data?.success){
            throw new Error(response?.data?.message)
          }
          enqueueSnackbar("Course Details Fetched Successfully", {variant:"success"})
          result = response?.data?.courseDetails;
          return result;
    }catch(error){
        console.log("COURSE DETAILS API ERROR", error);
        enqueueSnackbar("Failed to Fetch Course Details", {variant:"error"})

    }
}

export const fetchInstructorCourses= async() => {
    let result = null;
    try{
        const response = await apiConnector("POST",courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API);
        console.log("GET_ALL_INSTRUCTOR_COURSES API Response: ",response);
        if(!response?.data?.message){
            throw new Error(response?.data?.message);
        }
        result = response?.data?.instructorCourses;
        return result;
    }catch(error){
        console.log("GET_ALL_INSTRUCTOR_COURSES API Error: ",error);
    }
}

export const getALLCourses = async ()=>{
    let result = null;
     try{
        const response = await apiConnector("GET",courseEndpoints.GET_ALL_COURSE_API);
        console.log("GET ALL COURSE API response: ", response);
        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }
        result = response?.data?.courses;
      
        return result;
     }catch(error){
        console.log("Get all courses failed",error);
     }
}
export const createSection = async (data) => {
    let result = null;
    try{
        const response = await apiConnector("POST",courseEndpoints.CREATE_SECTION_API,data);
        console.log("CREATE_SECTION API Response: ",response?.data?.updateCourse);
        if(!response?.data?.message){
            throw new Error(response?.data?.message);
        }
        result = response?.data?.updateCourse;
        return result;
    }catch(error){
        console.log("CREATE_SECTION API Error: ",error);
    }
}


export const updateSection = async (data) => {
    let result = null ;
    try{
        const response = await apiConnector("PUT",courseEndpoints.UPDATE_SECTION_API,data)
        console.log("Update Section Api Response: " , response);
        if(!response?.data?.success){
            throw new Error("Couldn't update section")
        }
        result = response?.data?.section;
        return result;
        }catch(error){
            console.log("Update section API error: " ,error)
        }
        return result;
}

export const createSubSection = async(formData,enqueueSnackbar) => {
    let result = null;
    try{
        const response = await apiConnector("POST",courseEndpoints.CREATE_SUBSECTION_API,formData);
        console.log("Create subsection api response: ", response);
        if(!response?.data?.success){
            throw new Error(response?.data?.message)
        }
        enqueueSnackbar("Lecture added successfully", {variant:"success"})
        result = response?.data;
        return result;
    }catch(error){
        console.log("Error creating subsection",error);
        enqueueSnackbar("Lecture could not be added", {variant:"error"})
    }
}


export const updateSubSection = async (data) => {
    let result = null ;
    try{
        const response = await apiConnector("POST",courseEndpoints.UPDATE_SUBSECTION_API,data)
        console.log("Update SUBSECTION Api Response: " + response);
        if(!response?.data?.success){
            throw new Error("Couldn't update SUBSECTION")
        }
        result = response?.data?.data;
        }catch(error){
            console.log("UpdateSUBSECTION API error: " + error)
        }
        return result;
}

export const deleteSection = async(data) => {
    let result = null;
    try{
        const response = await apiConnector("DELETE",courseEndpoints.DELETE_SECTION_API,data);
        console.log("DELETE_SECTION API Response: ",response);
        if(!response?.data?.message){
            throw new Error(response?.data?.message);
        }
        result = response?.data
        return result?.deletedSection;
    }catch(error){
        console.log("DELETE_SECTION API Error: ",error);
    }
}

export const deleteSubSection = async(data) => {
    let result = null;
    try{
        const response = await apiConnector("POST",courseEndpoints.DELETE_SUBSECTION_API,data);
        console.log("DELETE_SUBSECTION API Response: ",response);
        if(response?.data?.message){
            throw new Error(response?.data?.message);
        }
        result = response?.data
        return result;
    }catch(error){
        console.log("DELETE_SUBSECTION API Error: ",error);
    }
}

export const deleteCourse= async(data) => {
    let result = null;
    try{
        const response = await apiConnector("POST",courseEndpoints.DELETE_COURSE_API,data);
        console.log("DELETE_COURSE API Response: ",response);
        if(response?.data?.message){
            throw new Error(response?.data?.message);
        }
        result = response?.data
        return result;
    }catch(error){
        console.log("DELETE_COURSE API Error: ",error);
    }
}

export const  makeCoursePublic = async(courseId, enqueueSnackbar)=>{
    try{
        const response = await apiConnector("PUT", courseEndpoints.MAKE_COURSE_PUBLIC_API,{courseId});
        console.log("MAKE_COURSE_PUBLIC API Response: ",response);
        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }
        enqueueSnackbar("Course made public", {variant:"success"})
    }catch(e){
        console.log("Error while making Course public", e.message);
        enqueueSnackbar("Failed to make course public", {variant:"error"})
    }
}

export const getCategoryPageDetails = async(categoryId)=>{
    try{
        console.log(categoryId);
        const response = await apiConnector("GET","http://localhost:8000/api/v1/course/getCategoryPageDetails",{},{categoryId});
        console.log("GET_CATEGORY_PAGE_DETAILS API Response: ",response);
        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }
        console.log(response);
        return response?.data?.data;
    }catch(error){
        console.log("GET_CATEGORY_PAGE_DETAILS API Error: ",error);
    }
}