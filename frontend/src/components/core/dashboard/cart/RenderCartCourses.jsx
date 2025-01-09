import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../store/reducers/cart-reducers";
import { enqueueSnackbar } from "notistack";
import { GiNinjaStar } from "react-icons/gi";
import ReactStars from "react-rating-stars-component";

const RenderCartCourses =() => {
    const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
    console.log("hi",cart)
    return(
        <div>
            {cart.map((course,index)=>(
                <div key={index}>
                    <div>
                        <img src={course?.thumbnail}/>
                        <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.category?.name}</p>
                            <div>
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

                    <div>
                      <div>
                         <button onClick={()=>dispatch(removeFromCart(course,enqueueSnackbar))}>
                            <RiDeleteBin6Line/> 
                            <span>Remove</span>
                         </button>
                         <p>Rs {course?.price}</p>
                      </div>
                    </div>
                </div>
               
            ))}
        </div>
    )
}
export default RenderCartCourses;