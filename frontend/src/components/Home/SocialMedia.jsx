import { useEffect, useState } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';

const SocialMedia = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
 const [isHovering,setIsHovering] = useState(false);

  // Function to handle mouse movement inside the div
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  useEffect(()=>{
    Aos.init({duration:1000});
},[])

    const handleMouseEnter = ()=>{
        setIsHovering(true);
    };
    const handleMouseLeave = ()=>{
        setIsHovering(false);
    };
    const gradientStyle = isHovering ? 
           { background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2),rgba(15, 15, 15, 0.5)`}
          
        :{};


  return (
    <div className="bg-[#0f0f0f] py-5 flex justify-center items-center">
      {/* Container div with 11/12 width */}
      <div className="w-11/12 mx-auto" data-aos="fade-down">
        <div
          className="relative grid grid-cols-1  md:grid-cols-4 gap-6 px-4 sm:px-10  py-20  rounded-3xl"
          style={gradientStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
         

          {/* Divs for content */}
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="group relative  p-10 rounded-2xl shadow-lg hover:shadow-inner transition-transform transform hover:-translate-y-2 duration-300 flex flex-col items-center overflow-hidden bg-[#2a374f]"
            //   style={{
            //     background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2)), rgba(15, 15, 15, 0.5)`,
            //   }}
            >
              <h2 className="text-3xl  font-bold relative z-10">{item === 1 ? '2M+' : item === 2 ? '10K+' : item === 3 ? '100K+' : '800K+'}</h2>
              <p className="mt-2 relative z-10">{item === 1 ? 'Subscribers on YouTube' : item === 2 ? 'Followers on Twitter' : item === 3 ? 'Followers on Instagram' : 'Followers on LinkedIn'}</p>
              <div className={`absolute inset-0 bg-gradient-to-r ${item === 1 ? 'from-purple-500 via-pink-500 to-red-500' : item === 2 ? 'from-blue-500 via-teal-500 to-green-500' : item === 3 ? 'from-yellow-500 via-orange-500 to-red-500' : 'from-indigo-500 via-purple-500 to-pink-500'} opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
