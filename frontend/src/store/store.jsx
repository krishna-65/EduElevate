import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/auth-reducer'
import cartReducer from "./reducers/cart-reducers";
import profileReducer from "./reducers/profile-reducers";
import viewCourseReducer from "./reducers/viewCourse-reducers";
import courseReducer from "./reducers/course-reducers";
import categoryReducer from "./reducers/category-reducer"

// Create a Redux store instance
export default configureStore({
    reducer:{
        // Define your reducers here.
        auth:authReducer,
        cart: cartReducer,
        profile: profileReducer,
        viewCourse: viewCourseReducer,
        course: courseReducer,
        category: categoryReducer
    }
});