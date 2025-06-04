import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";

const RenderTotalAmount =() => {

    const {total} = useSelector((state)=>state.cart);
    const {cart} = useSelector((state)=>state.cart);

    const handleBuyCourse = ()=>{
        const courses = cart.map((course)=>course.id);
        console.log("Bought these courses", courses);
    
    }
    return(
        <div className="text-2xl bg-[#161515] w-[200px] flex justify-center px-5 py-10 gap-3 items-center rounded ml-auto">
           <p>Total:</p>
           <p className="text-blue-500">Rs {total}</p>

           {/* <IconBtn
           text={"Buy Now"}
           onClick={handleBuyCourse}
           className={"w-full justify-center"}/> */}
        </div>
    )
}
export default RenderTotalAmount;