import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../store/reducers/cart-reducers";
import { enqueueSnackbar } from "notistack";
import { GiNinjaStar } from "react-icons/gi";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const RenderCartCourses =() => {
    const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
 
    return(
        <div>
            {cart.map((course,index)=>(
                <div key={index} className="bg-[#161515] flex items-center mt-10 justify-between p-2 flex-col md:flex-row gap-10">
                    <div className=" w-full md:w-[70%] mr-auto  flex  xl:items-center flex-col xl:flex-row gap-5 ">
                        <img src={course?.thumbnail} className="
                          rounded w-[100%] md:w-[300px] object-cover"/>
                        <div className="xl:ml-10 ">
                            <p className="text-2xl font-semibold ">{course?.courseName}</p>
                            <p className="text-sm">{course?.category?.name}</p>
                            <div className="flex items-center gap-3">
                                <span>4.5</span>
                                <ReactStars
                                count={5}
                                size={20}
                                activeColor="#ffd700"
                                emptyIcon={<GiNinjaStar/>}
                                fullIcon={<GiNinjaStar/>}
                                />
                                <span>{course?.ratingAndReviews?.length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mr-auto md:mr-5 ml-5 pb-4">
                    <p className="text-blue-400 font-semibold text-2xl mb-4 md:text-center md:mr-5">Rs {course?.price}</p>
                      <div className="mr-10 flex items-center flex-row-reverse md:flex-col-reverse gap-3">
                         <button className="bg-yellow-400 text-gray-900 px-7 py-2 rounded-md hover:scale-95 transition-all duration-200" onClick={()=>dispatch(removeFromCart({course,enqueueSnackbar}))}>
                            <RiDeleteBin6Line className="inline mr-2"/> 
                            <span>Remove</span>
                         </button>
                         <Link to={`/catalog/${course.courseName.split(" ").join('-')}/${course._id}`} className="bg-transparent border-2  px-7 py-2 border-blue-600 rounded-md hover:scale-95 transition-all duration-200">Buy</Link>
                        
                      </div>
                    </div>
                </div>
               
            ))}
        </div>
    )
}
export default RenderCartCourses;