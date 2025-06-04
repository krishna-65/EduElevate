import { createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

const initialState = {
     cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
     total: localStorage.getItem('total') ? JSON.parse(localStorage.getItem('total')):0,
     totalItems: localStorage.getItem('totalItem') ? JSON.parse(localStorage.getItem('totalItem')) : 0, 
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart: (state,value)=>{
            const { course, enqueueSnackbar } = value.payload;
          
            const index = state?.cart?.findIndex((item)=>item._id === course._id);
            if(index>=0){
                enqueueSnackbar("Course already in cart", {variant: 'error'});
                return ;
            }
            state.cart.push(course);
            state.totalItems++;
            state.total += course.price;

            //update loaclstorage
            localStorage.setItem('cart', JSON.stringify(state.cart));
            localStorage.setItem('total', JSON.stringify(state.total));
            localStorage.setItem('totalItem', JSON.stringify(state.totalItems));

            enqueueSnackbar("Course added to cart", {variant:'success'});
        },
        removeFromCart: (state, value) => {
             const {course, enqueueSnackbar} = value.payload;
             const index = state.cart.findIndex((item) => item._id === course._id);
             if(index >=0){
                 state.cart.splice(index, 1);
                 state.totalItems--;
                 state.total -= course.price;

                 //update loaclstorage
                 localStorage.setItem('cart', JSON.stringify(state.cart));
                 localStorage.setItem('total', JSON.stringify(state.total));
                 localStorage.setItem('totalItem', JSON.stringify(state.totalItems));
             }

             enqueueSnackbar('Course removed from cart', {variant: 'success'});    
        },
        resetCart: (state, value) =>{
             state.cart = [];
             state.total = 0;
             state.totalItems = 0;

             //update loaclstorage
             localStorage.removeItem('cart');
             localStorage.removeItem('total');
             localStorage.removeItem('totalItem');
        }


    }
})

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;

export default cartSlice.reducer;