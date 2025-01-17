import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RequirementFields = (
   {
        name,
        label,
        register,
        setValue,
        errors,
        placeholder,
        getValues
   }
) => {

    const { course, editCourse } = useSelector((state)=>state.course);
    const [ requirements, setRequirements ] = useState([]);
    const [ requirement, setRequirement ] = useState();

    useEffect(()=>{
        if(editCourse){
            setRequirements(JSON.parse(course?.instructions));
        }

    },[])

    useEffect(()=>{
        setValue(name, requirements);
    },[requirements])

    const handleOnClick = ()=> {
           
                if(requirement&&!requirements.includes(requirement))
                setRequirements([...requirements, requirement]);
                setRequirement('');
    }

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="name">{label}<sup className="text-red-400">*</sup></label>
            <input type="text"
            name="requirement"
            id="requirement"
            value={requirement}
            placeholder={placeholder}
            onChange={(event)=> setRequirement(event.target.value)}
            className="bg-transparent focus:outline-none focus:ring-2 focus:to-blue-400  border-2 border-gray-800 px-4 py-2 w-full" />
            <button className="flex px-4 py-2 rounded-md bg-yellow-400 w-20 text-gray-800 hover:scale-95 font-semibold transition-all duration-200 "
            type="button"
            onClick={handleOnClick}>Add</button>
            {requirements.map((requirement,index)=>(
                <div>
                    <div className="flex items-center gap-1 text-sm text-gray-800 bg-yellow-400 font-semibold rounded-full px-3 py-1" key={index}>
                        {requirement} 
                        <button className="text-gray-600 hover:text-gray-400 font-semibold" onClick={()=>setRequirements(requirements.filter((_,i)=>i!==index))}>x</button>
                    </div>
                </div>
            ))}
        </div>
    )

}
export default RequirementFields;