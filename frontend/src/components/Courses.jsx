import { div } from "framer-motion/client"
import CourseCart from "./common/CourseCart";
import { useState } from "react";

const Courses = ()=>{
    
          
    const createData = [

        {id:1,title:'Frontend Development', description:'Comprehensive frontend course focusing on modern web development techniques, including responsive design, javascript, and UI/UX principles.', imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwF6PooP7RIkdCz7SlviMtoLrL0M4DY17GqA&s',   duration: '7 hours',
           items: [
               {
                   name: 'HTML',
                   duration: '4 hours',
                   subItems: [
                   { name: 'Introduction to HTML', duration: '30 mins' },
                   { name: 'HTML Elements', duration: '30 mins' },
                   { name: 'HTML Attributes', duration: '30 mins' },
                   { name: 'HTML Version History', duration: '30 mins' },
                   { name: 'HTML Forms', duration: '1 hour' },
                   { name: 'HTML5 New Features', duration: '1 hour' },
                   ],
               },
               {
                   name: 'CSS',
                   duration: '4 hours',
                   subItems: [
                   { name: 'Introduction to CSS', duration: '30 mins' },
                   { name: 'Inline, Internal, and External CSS', duration: '1 hour' },
                   { name: 'CSS Selectors and Specificity', duration: '1 hour' },
                   { name: 'CSS Box Model', duration: '30 mins' },
                   { name: 'Flexbox and Grid Layouts', duration: '1 hour' },
                   ],
               },
               {
                   name: 'JavaScript Essentials',
                   duration: '2 hours',
                   subItems: [
                   { name: 'JavaScript Basics', duration: '30 mins' },
                   { name: 'DOM Manipulation', duration: '1 hour' },
                   { name: 'Event Handling', duration: '30 mins' },
                   ],
               },
               {
                   name: 'React.js Fundamentals',
                   duration: '6 hours',
                   subItems: [
                   { name: 'Introduction to React', duration: '30 mins' },
                   { name: 'JSX and Rendering Elements', duration: '1 hour' },
                   { name: 'Components and Props', duration: '1 hour' },
                   { name: 'State and Lifecycle', duration: '1 hour' },
                   { name: 'Handling Events in React', duration: '30 mins' },
                   { name: 'Conditional Rendering', duration: '30 mins' },
                   { name: 'Lists and Keys', duration: '30 mins' },
                   { name: 'Forms in React', duration: '30 mins' },
                   ],
               }
               ],},


       {id:2,title:'Backend Developmet', description:'Comprehensive frontend course focusing on modern web development techniques, including responsive design, javascript, and UI/UX principles.', imageUrl:'https://www.shutterstock.com/image-vector/back-end-development-banner-concept-260nw-422011339.jpg',  duration: '6 hours',
           items: [
               {
                 name: 'Node.js',
                 duration: '5 hours',
                 subItems: [
                   { name: 'Introduction to Node.js', duration: '30 mins' },
                   { name: 'Setting Up Node.js Environment', duration: '30 mins' },
                   { name: 'Understanding the Event Loop', duration: '1 hour' },
                   { name: 'Modules and NPM', duration: '1 hour' },
                   { name: 'File System and Streams', duration: '1 hour' },
                   { name: 'Building a Simple Server', duration: '1 hour' },
                 ],
               },
               {
                 name: 'Express.js',
                 duration: '5 hours',
                 subItems: [
                   { name: 'Introduction to Express.js', duration: '30 mins' },
                   { name: 'Setting Up Express', duration: '30 mins' },
                   { name: 'Middleware Functions', duration: '1 hour' },
                   { name: 'Routing in Express', duration: '1 hour' },
                   { name: 'Handling Requests and Responses', duration: '1 hour' },
                   { name: 'Building RESTful APIs', duration: '1 hour' },
                 ],
               },
               {
                 name: 'MongoDB',
                 duration: '4 hours',
                 subItems: [
                   { name: 'Introduction to MongoDB', duration: '30 mins' },
                   { name: 'Setting Up MongoDB', duration: '30 mins' },
                   { name: 'CRUD Operations in MongoDB', duration: '1 hour' },
                   { name: 'Indexing and Aggregation', duration: '1 hour' },
                   { name: 'Mongoose ODM', duration: '1 hour' },
                 ],
               },
             ],
         },


       {id:3,title:'UI/UX Design', description:'UI/UX design course exploring user-centered design principles, wireframing, proptotyping, and creating intuitive, engaging interfaces.', imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSiffOhHftIHAK8MTT3fKPPlhoQVlS6sV9hQ&s',  duration: '5 hours',
           items: [
               {
                 name: 'Introduction to UI/UX',
                 duration: '1 hour',
                 subItems: [
                   { name: 'What is UI/UX?', duration: '20 mins' },
                   { name: 'Differences Between UI and UX', duration: '20 mins' },
                   { name: 'The Importance of Design in Product Development', duration: '20 mins' },
                 ],
               },
               {
                 name: 'UI Design Principles',
                 duration: '3 hours',
                 subItems: [
                   { name: 'Color Theory and Usage', duration: '1 hour' },
                   { name: 'Typography in UI Design', duration: '1 hour' },
                   { name: 'Visual Hierarchy and Layout', duration: '1 hour' },
                 ],
               },
               {
                 name: 'UX Research & Strategy',
                 duration: '2 hours',
                 subItems: [
                   { name: 'User Research Methods', duration: '1 hour' },
                   { name: 'Creating User Personas', duration: '30 mins' },
                   { name: 'User Journey Mapping', duration: '30 mins' },
                 ],
               },
               {
                 name: 'Wireframing & Prototyping',
                 duration: '2 hours',
                 subItems: [
                   { name: 'Introduction to Wireframing', duration: '30 mins' },
                   { name: 'Low-Fidelity Wireframes', duration: '30 mins' },
                   { name: 'High-Fidelity Prototypes', duration: '1 hour' },
                 ],
               },
               {
                 name: 'Usability Testing',
                 duration: '2 hours',
                 subItems: [
                   { name: 'Conducting Usability Tests', duration: '1 hour' },
                   { name: 'Analyzing Usability Test Results', duration: '30 mins' },
                   { name: 'Improving Design Based on Feedback', duration: '30 mins' },
                 ],
               },

             ]
           },


       {id:4,title:'MongoDB Database', description:'MongoDB course focused on NoSQL database design, querying, data modeling and performance optimization for scalable applications.', imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm1jJPqTLrRnxCW0iuvq0oHrIW4eECAlrdCg&s', duration: '6 hours',
           items: [
               {
                 name: 'Introduction to MongoDB',
                 duration: '1 hour',
                 subItems: [
                   { name: 'What is MongoDB?', duration: '20 mins' },
                   { name: 'Installing and Setting Up MongoDB', duration: '20 mins' },
                   { name: 'Understanding Databases, Collections, and Documents', duration: '20 mins' },
                 ],
               },
               {
                 name: 'CRUD Operations',
                 duration: '2 hours',
                 subItems: [
                   { name: 'Creating Documents', duration: '30 mins' },
                   { name: 'Reading Documents', duration: '30 mins' },
                   { name: 'Updating Documents', duration: '30 mins' },
                   { name: 'Deleting Documents', duration: '30 mins' },
                 ],
               },
               {
                 name: 'Advanced Querying',
                 duration: '1 hour',
                 subItems: [
                   { name: 'Query Operators and Conditions', duration: '30 mins' },
                   { name: 'Working with Arrays', duration: '30 mins' },
                 ],
               },
               {
                 name: 'Indexing',
                 duration: '1 hour',
                 subItems: [
                   { name: 'Introduction to Indexes', duration: '20 mins' },
                   { name: 'Creating and Managing Indexes', duration: '20 mins' },
                   { name: 'Impact of Indexes on Performance', duration: '20 mins' },
                 ],
               },
               {
                 name: 'Aggregation',
                 duration: '2 hours',
                 subItems: [
                   { name: 'Understanding the Aggregation Pipeline', duration: '30 mins' },
                   { name: 'Common Aggregation Operators', duration: '30 mins' },
                   { name: 'Using $lookup and $unwind', duration: '30 mins' },
                   { name: 'Aggregation Performance Optimization', duration: '30 mins' },
                 ],
               },
               {
                 name: 'Working with Mongoose',
                 duration: '1 hour',
                 subItems: [
                   { name: 'Introduction to Mongoose ODM', duration: '20 mins' },
                   { name: 'Defining Schemas and Models', duration: '20 mins' },
                   { name: 'Performing CRUD Operations with Mongoose', duration: '20 mins' },
                 ],},
           ],
          }, 



          {id:5,title:'Fullstack Development', description:'Full stack development course covering both frontend and backend technologies, including web frameworks, databases, and API integration.', imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPV0S6QPMqXN7rCVsTPsQzKSWcb2mpBU6Z4Q&s', duration: '10 hours',
            items: [
                {
                  name: 'Frontend Development',
                  duration: '8 hours',
                  subItems: [
                    { name: 'HTML, CSS, and JavaScript Basics', duration: '2 hours' },
                    { name: 'React.js Basics', duration: '2 hours' },
                    { name: 'Advanced React: Hooks and Context', duration: '2 hours' },
                    { name: 'Responsive Design with CSS and Flexbox/Grid', duration: '2 hours' },
                  ],
                },
                {
                  name: 'Backend Development',
                  duration: '8 hours',
                  subItems: [
                    { name: 'Node.js Basics', duration: '2 hours' },
                    { name: 'Express.js and RESTful APIs', duration: '2 hours' },
                    { name: 'Database Management with MongoDB', duration: '2 hours' },
                    { name: 'Authentication and Authorization', duration: '2 hours' },
                  ],
                },
                {
                  name: 'Deployment and DevOps',
                  duration: '3 hours',
                  subItems: [
                    { name: 'Version Control with Git and GitHub', duration: '1 hour' },
                    { name: 'Continuous Integration/Continuous Deployment (CI/CD)', duration: '1 hour' },
                    { name: 'Deploying Applications on Cloud Platforms (Heroku, AWS, etc.)', duration: '1 hour' },
                  ],
                },
                {
                  name: 'Project Management and Collaboration',
                  duration: '1 hour',
                  subItems: [
                    { name: 'Agile Methodology and Scrum', duration: '30 mins' },
                    { name: 'Collaboration Tools (JIRA, Trello, Slack)', duration: '30 mins' },
                  ],
                },],
              },
 
              {id:6,title:'C++ In-depth', description:'IN-depth C++ course exploring advanced programing concepts, object-oriented design, memory management, and efficient algorithm implementation.', imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6rbRNqV5k5-mT3HqHmNT6rnfT1UEGstEPWg&s',
                items: [
                  {
                    name: 'Introduction to C++',
                    duration: '2 hours',
                    subItems: [
                      { name: 'History and Overview of C++', duration: '30 mins' },
                      { name: 'Setting Up the Development Environment', duration: '30 mins' },
                      { name: 'First C++ Program', duration: '30 mins' },
                      { name: 'Basic Syntax and Structure', duration: '30 mins' },
                    ],
                  },
                  {
                    name: 'C++ Language Fundamentals',
                    duration: '4 hours',
                    subItems: [
                      { name: 'Data Types and Variables', duration: '1 hour' },
                      { name: 'Operators and Expressions', duration: '1 hour' },
                      { name: 'Control Flow Statements (if, switch, loops)', duration: '1 hour' },
                      { name: 'Functions and Scope', duration: '1 hour' },
                    ],
                  },
                  {
                    name: 'Object-Oriented Programming (OOP) in C++',
                    duration: '4 hours',
                    subItems: [
                      { name: 'Classes and Objects', duration: '1 hour' },
                      { name: 'Constructors and Destructors', duration: '1 hour' },
                      { name: 'Inheritance and Polymorphism', duration: '1 hour' },
                      { name: 'Encapsulation and Abstraction', duration: '1 hour' },
                    ],
                  },
                  {
                    name: 'Advanced C++ Features',
                    duration: '3 hours',
                    subItems: [
                      { name: 'Pointers and References', duration: '1 hour' },
                      { name: 'Dynamic Memory Management', duration: '1 hour' },
                      { name: 'Templates and Generics', duration: '1 hour' },
                    ],
                  },
                  {
                    name: 'Debugging and Optimization',
                    duration: '2 hours',
                    subItems: [
                      { name: 'Debugging Techniques and Tools', duration: '1 hour' },
                      { name: 'Code Optimization Strategies', duration: '1 hour' },
                    ],
                  },
                ],
             },
     
  
   
   ];

//    const [mousePos,setMousePos] = useState({x:0,y:0});
//    const [isHovering,setIsHovering] = useState(false);

//    const handleMouseMove = (e) => {
//     const {left,top,width,height} = e.target.getBoundingClientRect();

//         const x = ((e.ClientX - left) /width) * 100;
//         const y = ((e.clientY - top) / height) * 100;
//         setMousePos({x,y});
//    }
//    const handleMouseEnter = ()=>{
//                 setIsHovering(true);
//    }
//    const handleMouseLeave = ()=>{
//     setIsHovering(false);
//    }


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


   const gradientStyle = isHovering ?
                            { background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #382927, #0f0f0f, #010101)`}
                            : {};

    
    return(
        <div className="w-full bg-[#0f0f0f] my-14">
            
            <div className="w-11/12 mx-auto py-20 text-white rounded-3xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            
            >
                    <h2 className="text-center font-semibold text-4xl">Courses</h2>
                   <div className=" mx-auto grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-8 py-10 text-white rounded-3xl">
            {createData.map((data)=><CourseCart data={data}
            style={gradientStyle}/>)}
                </div>
            </div>

        </div>
    )
}
export default Courses;