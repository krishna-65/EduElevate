import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis"
import Loader from "../common/Loader"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      setLoading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      // console.log("Email Res - ", res)
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

 if(loading) return <Loader/>

    return (
        <div className="px-4 md:px-8 lg:px-16 mx-auto flex justify-center items-center py-20 w-full ">
            {loading ? (
                <Loader className="bg-transparent w-full h-[300px]" />
            ) : (
                <form
                    className="w-full max-w-2xl   p-6 rounded-lg shadow-lg"
                    onSubmit={handleSubmit(submitContactForm)}
                >
                    <div className="py-10">
                        <h3 className="text-3xl text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">Get In Touch</h3>
                        <p className="text-center text-white">We'd love to here for you. Please fill out this form</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div className="flex flex-col">
                            <label htmlFor="firstName" className="text-sm font-medium">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                className="rounded-md py-2 px-3 bg-transparent border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                                placeholder="Enter first name"
                                {...register("firstName", { required: true })}
                            />
                            {errors.firstName && (
                                <span className="text-red-500 text-sm">Please enter your first name</span>
                            )}
                        </div>
                        {/* Last Name */}
                        <div className="flex flex-col">
                            <label htmlFor="lastName" className="text-sm font-medium">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                className="rounded-md py-2 px-3 bg-transparent border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                                placeholder="Enter last name"
                                {...register("lastName")}
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div className="flex flex-col mt-4">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="rounded-md py-2 px-3 bg-transparent border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                            placeholder="Enter your email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">Please enter a valid email address</span>
                        )}
                    </div>
                    {/* Phone Number */}
                    <div className="flex flex-col mt-4">
                        <label htmlFor="phoneNo" className="text-sm font-medium">
                            Phone Number
                        </label>
                        <div className="flex gap-2">
                            <select
                                className="rounded-md py-2 px-3 bg-transparent border border-gray-400 w-[80px] focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                                {...register("countryCode", { required: true })}
                            >
                                {CountryCode.map((element, index) => (
                                    <option key={index} value={element.code}>
                                        {element.code} - {element.country}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                name="phoneNo"
                                id="phoneNo"
                                className="flex-1 rounded-md py-2 px-3 bg-transparent border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                                placeholder="12345 67890"
                                {...register("phoneNo", 
                                    { required: {value:true, message:"Please Enter a valid Phone Number"}, 
                                        maxLength:{value: 10, message:"Invalid phone number"},
                                        minLength:{value: 8, message:"Please enter a valid"}
                                
                                })}
                            />
                        </div>
                        {errors.message && (
                            <span className="text-red-500 text-sm">errors.phoneNo.message</span>
                        )}
                    </div>
                    {/* Message */}
                    <div className="flex flex-col mt-4">
                        <label htmlFor="message" className="text-sm font-medium">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            className="rounded-md py-2 px-3 bg-transparent border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                            placeholder="Enter your message"
                            {...register("message", { required: true })}
                        ></textarea>
                        {errors.message && (
                            <span className="text-red-500 text-sm">Please enter a valid message</span>
                        )}
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:scale-95 transition-transform duration-200"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default ContactUsForm