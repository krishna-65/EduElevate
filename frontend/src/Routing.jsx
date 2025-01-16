import React, { useEffect } from 'react';
import './index.css';

import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';
import SignupPage from './pages/SignupPage';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/ResetPassword';
import OtpVerification from './pages/VerifyEmail';
import AddCoursePage from './pages/AddCourse';
import MoreDetailsPage from './pages/MoreDetails';
import AboutPage from './pages/AboutPage';
import ContactUsPage from './pages/ContactUsPage';
import PrivateRoute from './components/core/auth/PrivateRoute';
import MyProfile from './components/core/dashboard/MyProfile';
import MyCourses from './components/core/dashboard/myCourses/index';
import Setting from './components/core/dashboard/Setting';
import { useDispatch, useSelector } from 'react-redux';
import { verifySession } from './services/operations/authAPI';
import EnrolledCourses from './components/core/dashboard/EnrolledCourses';
import Cart from './components/core/dashboard/cart';
import { ACCOUNT_TYPE } from './utils/constants';
import AddCourse from './components/core/dashboard/AddCourse/Index'
import Dashboard from './pages/MoreDetails';
import Instructor from './components/core/dashboard/InstructorDashboard/Instructor';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';


const Routing = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(verifySession());
  },[])

  const {user} = useSelector((state)=>state.profile);
  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen overflow-x-hidden">

          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/dashboard' element={<Home/>}/>
            <Route path='*' element = {<NotFound/>}/>
           {/* Private Routes */}
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            {/* Nested Routes for Dashboard  */}
             <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/settings" element={<Setting />} /> 

             {/* Conditional Routes based on user account type */}
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart />} />
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
              </>
            )}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/instructor" element={<Instructor />} />
              </>
            )}
          </Route>
            <Route path='/login' element={<LoginPage/>}/>
             <Route path='/signup' element={<SignupPage/>}/>
            <Route path='/courses' element={<CoursesPage/>}/>
            <Route path='/support/:title' element={<NotFound/>}/>
            <Route path='/plans/:title' element={<NotFound/>}/>
            <Route path='/resources/:title' element={<NotFound/>}/>
            <Route path='/community/:title' element={<NotFound/>}/>
            <Route path='/:title' element={<NotFound/>}/>
            <Route path='/forgotPassword' element={<ForgotPassword/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/update-password/:token' element={<UpdatePassword/>}/>
            <Route path='/verify-email' element={<OtpVerification/>}/>
            <Route path='/addCourse' element={<AddCoursePage/>}/>
            <Route path='/contact' element={<ContactUsPage/>}/> 
            <Route path='/catalog/:name' element={<Catalog/>}/>
            <Route path='/catalog/:name/:id' element={<CourseDetails/>}/>
          </Routes>
    
    </div>
  );
};

export default Routing;
