import { useState } from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

const Cart = () => {
   
    const {totalItems,total} = useSelector((state)=> state.cart);
    return(
            <div> 
                <h3 className="text-2xl font-semibold text-[#c9b1b1]">Your Cart</h3>
                <p className="ml-3 opacity-70">{totalItems} Courses in Cart</p>
               { !total > 0  ? (<div className=" h-[80vh]  flex justify-center items-center">
                        <p className="text-lg">You cart is empty !</p>
                    </div>)
                    :(
                      <div>
                         <RenderCartCourses/>
                         <RenderTotalAmount/>
                     </div>
                    )}
            </div>
    )
}
export default Cart;