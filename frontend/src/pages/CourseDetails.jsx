import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/common/Nav";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCourseDetails } from "../services/operations/courseAPI";
import { enqueueSnackbar } from "notistack";
import Loader from "../components/common/Loader";
import Footer from "../components/Footer";
import { FaVideo } from "react-icons/fa";
import { GiArrowCursor } from "react-icons/gi";
import { CiMobile4 } from "react-icons/ci";
import { GrCertificate } from "react-icons/gr";
import { addToCart } from "../store/reducers/cart-reducers";
import axios from "axios";
const CourseDetails = () =>{
    const {user} = useSelector((state)=>state.profile);
    const {id} = useParams();
    const [course,setCourse] = useState();
    const [loading, setLoading] = useState(false);
    const [totalSubSection,setTotalSubSection] = useState(0);
    const [timeDuration,setTimeDuration] = useState(0);
    const [instructions,setInstructions] = useState([])
    const dispatch = useDispatch();

    ///********Payment Gateway********** */
  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: course?.price * 100, //  = INR 1
    name: "",
    description: 'some description',
    image:
      `${serverurl}/images/logo.png`, // add here your wensite logo ok
    handler: async function (response) {
      //  console.log("payment ki full detail ",response)
      // alert(response.razorpay_payment_id);

        // let body = {
        //   productdetailid: item.productdetailid,
        //   transitionid: response.razorpay_payment_id,
        //   userid: userData?.userid,
        //   addressid: userData?.item?.addressid,
        //   qty: item.qty
        // } // sun yha jo couse hai uska data set ker de jese mene apne project ka kiya hai or jo teri order table me column name hai vo vo likh de

        let result = await axios.post("https://eduelevate-8s1p.onrender.com/api/v1/capturePayment",{
          courseId: course._id,
        });// yha api call ker diyo ye wali jo abi tune mujhe dikhai hai 
 // see this is for adding the couse deatils in database 

      navigate('/home')

      //  let result = await postData('yourorder/fetch_orderid',{transitionid:response.razorpay_payment_id})  
      //  alert(JSON.stringify(result?.data))
      // productdetailidlist.map((item)=>{
      //   let result = postData('yourorder/submit_orderedproduct',{})
      // })

    },
    prefill: {
      name: '',
      contact: '',
      email: ''
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const handlePayment = async () => {
    // console.log("helooooo",userkey)
    if (!user){// this is for check that use login or not so apply condition according to your logic 
      navigate('/login')
    }else{
          var rzp1 = new window.Razorpay(options);
          rzp1.open();

    }


  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);



  ////********************* */


    useEffect(()=>{
        const fetchCourse = async() => {
            setLoading(true);
            const response = await fetchCourseDetails(id,enqueueSnackbar);
            setCourse(response);
            setLoading(false);
        }
        fetchCourse();
    },[]);
  
    useEffect(() => {
        if (course?.courseContent) {
            // Calculate total sub-sections
            const totalSubSections = course.courseContent.reduce(
                (acc, content) => acc + (content?.subSection.length || 0),
                0
            );
            setTotalSubSection(totalSubSections);
    
            // Calculate total time duration
            const totalDuration = course.courseContent.reduce(
                (acc, content) =>
                    acc +
                    content?.subSection.reduce(
                        (subAcc, value) => subAcc + parseFloat(value.timeDuration || 0), // Convert timeDuration to a number
                        0
                    ),
                0
            );
            setTimeDuration(totalDuration.toFixed(2)); // Optionally round to 2 decimal places
        }
        if(course?.instructions)
       setInstructions(JSON.parse(course?.instructions))
    }, [course]);
 
    const handleAddToCart = () =>{
            if(!user)  enqueueSnackbar('For Adding Login First', {variant: 'error'});  
            else
            dispatch(addToCart({course,enqueueSnackbar}));
    }
    if(loading) return <Loader/>;

 
    return (
        <>
        <Navbar/>

        <div className="relative mt-32 p-10 pb-32 border-t-2 md:border-y-2 border-blue-700 shadow-2xl">
      <div className="mb-10">
        <h1 className="text-white text-xl sm:text-2xl md:text-3xl">
          <Link to='/'>Home</Link> / Catalog / {course?.category?.name} / <span className="text-[#6674CC]">{course?.courseName}</span>
        </h1>
        <span className="text-gray-500 text-sm sm:text-base leading-6 sm:leading-7 block mt-2">{course?.courseDescription}</span>
        <p className="text-sm sm:text-base text-gray-400 mt-2">{course?.studentEnrolled.length} Students</p>
        <p className="text-sm sm:text-base text-gray-400 mt-1">Created by <span className="text-[#6674CC] text-lg">{course?.instructor?.firstName + " " + course?.instructor?.lastName}</span></p>
      </div>

      {/* Cart section */}
      <div className="top-[600px]  md:top-[250px] right-8  sm:right-20 p-10 w-[80%] sm:max-w-md mx-auto border-2 border-blue-700  absolute flex flex-col gap-5 rounded-lg shadow-lg sm:w-[80vw] lg:w-[40vw] xl:[25vw]">
        <img
          src={course?.thumbnail}
          className="rounded mb-4 w-full object-contain h-56 sm:h-72"
          alt={course?.courseName}
        />
        <h3 className="text-2xl text-white">RS. {course?.price}</h3>
        <button onClick={handleAddToCart} className={`${user?.accountType==="Instructor"?"opacity-50 pointer-events-none": "opacity-100"} px-7 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:scale-95 transition-all duration-200 mt-4`}>
          Add to cart
        </button>
        <button className={`${user?.accountType==="Instructor"?"opacity-50 pointer-events-none": "opacity-100"} px-7 py-2 bg-transparent border-blue-700 border-2 font-semibold rounded hover:scale-95 transition-all duration-200 mt-2`} onClick={handlePayment} >
          Buy now
        </button> 

        <div className="mt-4">
          <h5 className="text-white my-3 text-lg">This course includes:</h5>
          <p className="p-1 text-blue-300 flex items-center">
            <GiArrowCursor className="inline mr-2" /> Full Lifetime access
          </p>
          <p className="p-1 text-blue-300 flex items-center">
            <CiMobile4 className="inline mr-2" /> Access on Mobile and Laptop
          </p>
          <p className="p-1 text-blue-300 flex items-center">
            <GrCertificate className="inline mr-2" /> Certificate of completion
          </p>
        </div>
      </div>
    </div>
        

        <div className="xl:mt-[400px] mt-[1000px]  w-[90%] md:w-11/12 mx-auto flex flex-col gap-10">
           <div className="border-2 border-blue-700  md:w-[700px] p-10 mb-10 rounded">
                <h3 className="my-4 text-2xl">What You Will Learn</h3>
                {
                course?.whatYouWillLearn?.split('.').map((text,index) =>  <h4 key={index} className="px-2 py-1 text-stone-400">{index+1}.  {text}</h4>
                )}
               
           </div>

           <div >
             <h3 className="text-2xl">Course Content</h3>
             <h5 className="p-2 mb-5 text-sm">
                {[`${course?.courseContent?.length || 0} Sections`, 
                    `${totalSubSection || 0} lectures`, 
                    `${Math.floor(timeDuration / 60) || 0}h`, 
                    `${Math.floor(timeDuration % 60) || 0}m total length`
                ].join(" · ")}
                </h5>

                <div className="border-2 border-blue-700 md:w-[700px] p-5 rounded flex flex-col gap-12">
                      {course?.courseContent.map(content => (
                          <details key={content._id}>
                          <summary>
                          {content.sectionName}
                          </summary>
                          {content?.subSection.map(subSection => (
                            <details  key={subSection._id} className="my-4 flex flex-col gap-5 p-3">
                                 <summary>{subSection.title}</summary>
                                 <p className="p-2 text-stone-400"><FaVideo className="inline mr-2" />{subSection.description}</p>
                            </details>
                          ))}
                      </details>
                      ))}
                </div>

               
           </div>

           <div className="mt-10 border-2 border-blue-700 p-5">
                    <h3 className="text-2xl my-4 text-center sm:flex">Author</h3>
                    <div className="flex sm:flex-row flex-col gap-5 items-center">
                    <img
                                src={`${course?.instructor?.image}`}
                                alt={`profile-${course?.instructor?.firstName}`}
                                loading="lazy"
                                className="aspect-square w-[60px] sm:w-[70px] rounded-full object-cover"
                            />
                        <span className="text-[#6674CC] text-lg "> {course?.instructor?.firstName + " " + course?.instructor?.lastName}</span>
                    </div>
                    <p className="p-5 text-stone-400">I will be your lead trainer in this course. With no time, I will help you to understand the subject in an easy manner. I have a huge experience in online training and recorsing videos. Let's get started!</p>
                </div>

                <div className="border-2 border-blue-700  md:w-[700px] p-10 mb-10 rounded">
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl">Prerequisites</h3>
                      {instructions?.map((instruction,index)=>(
                       
                          <p key={index}>{index+1}. {instruction}</p>
                     
                      ))}
                      </div>
                </div>
        </div>

    <Footer/>
    </>
    )
}
export default CourseDetails;