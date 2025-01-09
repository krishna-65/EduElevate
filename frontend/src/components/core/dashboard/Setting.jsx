import { enqueueSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { updateProfile, updateProfilePicture } from "../../../services/operations/ProfileAPI";

const Setting = () => {

  const { user } = useSelector((state) => state.profile);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
      about: user?.additionalDetails?.about || "",
      gender: user?.additionalDetails?.gender || "",
    },
  });

 
  const userData = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
    about: user?.additionalDetails?.about || "",
    gender: user?.additionalDetails?.gender || "",
  }
  const [loading,setLoading] = useState(false);

  //check data is updated or not 
  const checkDataIsUpdated = (data)=>{
        return JSON.stringify(userData) !== JSON.stringify(data);
  }
  // Handle form submission
  const onSubmit = async(data) => {
    if(!checkDataIsUpdated(data)){
        enqueueSnackbar("Informations is not updated", {variant:'info'
        })
    }else
    {
        setLoading(true)
        try{
            const response = await updateProfile(data);
            console.log(response);
            enqueueSnackbar("Informations is updated", {variant:'success'
            })
        }catch(error){
            console.log("Update Profile API Error....", error);
            enqueueSnackbar(error?.message||"Update Profile Failed", {variant:'error'
            })
        }
        setLoading(false)
    }
  
  };

  // Handle cancel
  const handleCancel = () => {
    reset({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
      about: user?.additionalDetails?.about || "",
      gender: user?.additionalDetails?.gender || "",
    });
  };

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };
 const handleProfileImageChange = async () => {
    if (!file) {
      enqueueSnackbar("Please select a file to upload", { variant: "error" });
      return;
    }
    else{
        const formData = new FormData();
        formData.append("file", file); // Append the new file
        setLoading(true)
        const response = await updateProfilePicture(formData);
        enqueueSnackbar("Profile Picture is updated",{variant:"success"});
        setLoading(false)
    }
}
  return (
    <div >
      <h2>Edit Profile</h2>

      {/* Profile Picture Section */}
      <div className="py-5 my-3 bg-[#161515] shadow rounded-md flex md:flex-row flex-col sm:px-3 justify-between md:items-center gap-3 md:gap-20">
     <div className="flex gap-4 md:gap-10 items-center">
            <img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                loading="lazy"
                className="aspect-square w-[60px] rounded-full object-cover"
                />
                <p className="text-center font-rubik text-xl my-2">
                    {`${user?.firstName} ${user?.lastName}`}
                </p>
     </div>
       
          <div className="flex sm:flex-row flex-col gap-3">
          <div className="my-2">
                <label
                    htmlFor="picture-input"
                    className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:scale-95"
                    >
                    Select Picture
                    <input
                        id="picture-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    </label>
                    {fileName && (
                        <p className="mt-2 text-gray-700 text-sm">
                        Selected File: <span className="font-medium">{fileName}</span>
                        </p>
                    )}
          </div>
         <div>
            <button className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-md text-[#333] transition-all hover:scale-95 duration-200"
            onClick={handleProfileImageChange}>
                Upload
                </button>
         </div>
          </div>
      
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-3 md:px-10 py-5 my-3 bg-[#161515] shadow rounded-md">
          <h3 className="my-2 font-semibold text-lg">Profile Information</h3>
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col w-[90%] md:w-[80%]">
              <label htmlFor="firstName" className="block text-sm mt-4">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-transparent focus:outline-none"
                {...register("firstName")}
              />
            </div>
            <div className="flex flex-col w-[90%] md:w-[80%]">
              <label htmlFor="lastName" className="block text-sm mt-4">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-transparent focus:outline-none"
                {...register("lastName")}
              />
            </div>
            <div className="flex flex-col  w-[90%] md:w-[80%]">
              <label htmlFor="email" className="block text-sm mt-4">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-transparent focus:outline-none"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col  w-[90%] md:w-[80%]">
              <label htmlFor="dateOfBirth" className="block text-sm mt-4">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-transparent focus:outline-none"
                {...register("dateOfBirth")}
              />
            </div>
            <div className="flex flex-col  w-[90%] md:w-[80%]">
              <label htmlFor="about" className="block text-sm mt-4">
                About
              </label>
              <textarea
                id="about"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-transparent focus:outline-none"
                placeholder="Write something about yourself"
                {...register("about")}
              ></textarea>
            </div>
            <div className="flex flex-col  w-[90%] md:w-[80%]">
            <label for="gender" className="block text-sm mt-4">Select Gender</label>
            <select
                id="gender"
                name="gender"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-transparent text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                <option value="" disabled selected className="text-gray-500">
                    Select your gender
                </option>
                <option value="male" className="bg-transparent text-gray-700">
                    Male
                </option>
                <option value="female" className="bg-transparent text-gray-700">
                    Female
                </option>
                <option value="other" className="bg-transparent text-gray-700">
                    Other
                </option>
                </select>


            </div>
          </div>
          <div className="px-10 py-5 m-3 bg-[#161515] shadow rounded-md flex md:flex-row flex-col justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-md 
                 bg-blue-500 text-white hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
        </div>

        {/* Buttons */}
    
      </form>
    </div>
  );
};

export default Setting;
