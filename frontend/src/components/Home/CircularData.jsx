import { HiRocketLaunch } from "react-icons/hi2";
import { FaCalendarAlt } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";

const CircularData = ({})=>{
        return (
           <div className="w-full mx-auto">

                 <div className="w-[90%] my-20  flex  flex-col justify-center space-y-6  mx-auto animate-slide-loop "
           >
                <div className="flex flex-col justify-center  text-white "
              >
                <div className="text-2xl flex items-center text-blue-400 font-semibold mb-2 gap-6"  >
                    <h2 className='rounded-full border p-3 border-blue-400'><FaBookReader /></h2>
                  <span>  Learn: Access 100+ Courses</span></div>
                  <hr className="my-8 w-[60%] opacity-30"/>
                </div>

                <div className="flex flex-col justify-center  text-white "
              >
                <div className="text-2xl flex items-center text-red-400 font-semibold mb-2 gap-6" >
                <h2 className='rounded-full border p-3 border-red-400'><FaCalendarAlt /></h2>

                    <span>Apply: Build, Play, Create</span>
                </div>
                
                <hr className="my-8 w-[60%] opacity-30"/>
            </div>            

            <div className="flex flex-col justify-center  text-white "
              >
                <div className="flex gap-6 text-2xl text-green-400 font-semibold mb-2 items-center" >
                    <h2 className='border p-3 rounded-full border-green-400'><HiRocketLaunch/></h2>
                    <span>Grow: Elevate Your Career</span>
                    </div>
                    <hr className="my-8 w-[60%] opacity-30"/>
                </div>

                <div className="flex flex-col justify-center  text-white "
              >
                <div className="text-2xl flex items-center text-blue-400 font-semibold mb-2 gap-6"  >
                    <h2 className='rounded-full border p-3 border-blue-400'><FaBookReader /></h2>
                  <span>  Learn: Access 100+ Courses</span></div>
                  <hr className="my-8 w-[60%] opacity-30"/>
                </div>

                <div className="flex flex-col justify-center  text-white "
              >
                <div className="text-2xl flex items-center text-red-400 font-semibold mb-2 gap-6" >
                <h2 className='rounded-full border p-3 border-red-400'><FaCalendarAlt /></h2>

                    <span>Apply: Build, Play, Create</span>
                </div>
                
                <hr className="my-8 w-[60%] opacity-30"/>
            </div>            

            <div className="flex flex-col justify-center  text-white "
              >
                <div className="flex gap-6 text-2xl text-green-400 font-semibold mb-2 items-center" >
                    <h2 className='border p-3 rounded-full border-green-400'><HiRocketLaunch/></h2>
                    <span>Grow: Elevate Your Career</span>
                    </div>
                    <hr className="my-8 w-[60%] opacity-30"/>
                </div>
            </div>
           </div>
        )
}
export default CircularData;