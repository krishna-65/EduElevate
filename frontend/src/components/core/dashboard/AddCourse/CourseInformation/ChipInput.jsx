import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";

const ChipInput= ({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues,
}) => {

    const {course,editCourse} = useSelector((state)=>state.course);
    const [chips,setChips] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        if (editCourse) {
          setChips(course?.tag || []);
        }
        register(name, {
          required: true,
          validate: (value) => value.length > 0, // Ensure at least one chip is added
        });
      }, [editCourse, course, name, register]);


    useEffect(()=>{
        setValue(name, chips)
    },[chips])

    const handleKeyDown = (event) => {
      if(event.key === "Enter" || event.key ===","){
          //prevent default behavior of event
          event.preventDefault();
          //get input value and remove all trailing/spacing
          const chip = event.target.value.trim();
          //add chip to array if it's not already there and input is not empty
          if (chip &&!chips.includes(chip)) {
              //add chip to array and clear input
              setChips([...chips, chip]);
              event.target.value = '';
          }
      }
    }

  
  return (
   <div className="flex flex-col gap-2">
        <label htmlFor={name}>{label} <sup className="text-red-400">*</sup></label>
       <div className="flex gap-3">
        {chips.map((chip,index)=>(
                <div>
                    <div className="flex items-center gap-1 text-sm text-gray-800 bg-yellow-400 rounded-full px-3 py-1" key={index}>
                        {chip} 
                        <button className="text-gray-600 hover:text-gray-400" onClick={()=>setChips(chips.filter((_,i)=>i!==index))}>x</button>
                    </div>
                </div>
            ))}
       </div>
        <input type="text"
        id={name}
        name={name}
        placeholder={placeholder} 
        onKeyDown={handleKeyDown}
        className="bg-transparent focus:outline-none focus:ring-2 focus:to-blue-700 text-sm px-4 py-2 rounded border-2 border-gray-800"
        />
        {errors[name] &&(
            <p className="text-red-500 text-sm">{errors[name].message}</p>
        )}
   </div>
  );
};

export default ChipInput;
