import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQSection = () => {
  // FAQs data
  const faqs = [
    {
      question: "What is EduElevate?",
      answer: "EduElevate is an online education platform that provides a variety of courses in development, design, and data science to help you elevate your skills.",
    },
    {
      question: "How do I sign up for a course?",
      answer: "Signing up is simple! Go to the courses section, choose your course, and follow the steps to create an account or log in.",
    },
    {
      question: "What courses do you offer?",
      answer: "EduElevate offers courses in Web Development, Full Stack Development, UI/UX Design, Data Science, and more. Browse the courses section for a full list.",
    },
    {
      question: "Are the courses self-paced?",
      answer: "Yes! All courses on EduElevate are self-paced so you can learn at your own speed and convenience.",
    },
    {
      question: "Do I receive a certificate?",
      answer: "Upon successful completion of a course, you will receive a certificate that you can share on your resume or LinkedIn profile.",
    },
  ];

  // State to track which question is open
  const [openIndex, setOpenIndex] = useState(null);

  // Handle toggle for FAQ
  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const [mousePos,setMousePos] = useState({x: 0, y: 0});
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e)=>{
      const {left,top,width,height} = e.target.getBoundingClientRect();

      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setMousePos({x, y});
  }
  const handleMouseEnter = () => {
      setIsHovering(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovering(false);
    };

  const gradientStyle =  isHovering ?  { background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2),rgba(15, 15, 15, 0.5)`} : {};


  return (
    <div className="w-11/12 rounded-3xl mx-auto bg-[#0f0f0f] py-32" id="faq-section"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onMouseMove={handleMouseMove}
    style={gradientStyle}
    >
      <h2 className="text-3xl text-center text-white font-semibold mb-10">Frequently Asked Questions</h2>

      <div className="space-y-8 w-[90%] md:w-[60%] mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`bg-[#1a1a1a] p-4  rounded-3xl transition-all duration-300 ${
              openIndex === index ? "shadow-lg" : "shadow-sm"
            }`}
           
          >
            {/* Question */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg text-white">{faq.question}</h3>
              <span className="text-white">
                {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </div>

            {/* Answer */}
            <div
              className={`text-gray-300 mt-2 pl-8 overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-[300px]" : "max-h-0"
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
