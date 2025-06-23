import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import Aos from "aos";
import 'aos/dist/aos.css';
import Logo from "../common/Logo";

const Success = ()=>{
    const testimonials = [
        { name: "Sarah Johnson", course: "Full Stack Development", testimonial: "EduElevate transformed my career." },
        { name: "David Lee", course: "UI/UX Design", testimonial: "The hands-on learning helped me build a great portfolio." },
        { name: "Emily Davis", course: "Data Science", testimonial: "The course structure was perfect for my growth." },
    ];

        useEffect(()=>{
            Aos.init({duration:1000});
        },[])

            const [mousePos,setMousePos]  =useState({x:0,y:0});
            const [isHovering, setIsHovering] = useState(false);

            const handleMouseMove = (e)=>{
                const { left, top, width, height } = e.target.getBoundingClientRect();
                const x = ((e.clientX - left) / width) * 100;
                const y = ((e.clientY - top) / height) * 100;
                setMousePos({x,y});
            }
            const handleMouseEnter = () => {
                setIsHovering(true);
              };
            
              const handleMouseLeave = () => {
                setIsHovering(false);
              };
              const gradientStyle = isHovering
              ? {
                  background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
                    rgba(35, 196, 92, 0.7), 
                    rgba(40, 180, 90, 0.4), 
                    rgba(20, 100, 60, 0.2), 
                    rgba(10, 80, 40, 0.1))`,
                }
              : {};
           

            return(
                <div className="w-full bg-[#0f0f0f] my-20" data-aos="fade-down">
                    <div className="w-11/12 mx-auto h-[500px] items-center py-5 flex flex-col md:flex-row md:gap-0 gap-10 justify-between overflow-hidden rounded-3xl px-3"
                      style={gradientStyle}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                            <div className="w-[100%] md:py-0 py-10 md:w-[50%] flex flex-col gap-2 px-4">
                                <h4 className="text-red-400 text-lg">Why We're Your</h4>
                                <h2 className="text-white text-4xl sm:text-5xl font-semibold">Best Code Learning Choice?</h2>
                                <p className="text-gray-400 text-sm">Choose <Logo className={`inline-block text-sm`}/> for an unparalleled coding experience</p>
                                <Link to='/login' className="bg-gradient-to-r from-[#1a3f62] to-[#2b445b] py-2 mt-4 w-[100%] rounded-full text-center sm:w-[200px]  hover:scale-95 transition-all duration-200">Let's Connect   <CiLocationArrow1 className="inline-block sm:ml-2 font-bold"/></Link>
                            </div>
                 <div className="relative w-[100%] md:w-[50%] overflow-hidden  sm:h-[320px] flex items-center justify-center ">
                    <div className="animate-slide-loop w-full flex flex-col transition-all duration-200">
                     {/* Duplicate testimonials for seamless scroll */}
                     {[...testimonials, ...testimonials].map((testimonial, index) => (
                          <div key={index}>

                            <div 
                                className="w-[90%]  p-4 my-2 h-[150px] text-center rounded-lg transition-transform duration-500"
                                     >
                                <h3 className="text-white text-lg font-semibold">{testimonial.name}</h3>
                                <p className="text-[#6d2a9c] text-sm">{testimonial.course}</p>
                                <p className="text-gray-400 text-xs">"{testimonial.testimonial}"</p>
                                <hr className="w-[60%] opacity-30 bg-gray-900 mx-auto mt-16"/>
                            </div>

                          </div>

                           
                        ))}
                    </div>
                </div>
                    </div>
                </div>
            )
}
export default Success;