import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Link, useLocation } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import ProfileDropDown from '../core/auth/ProfileDropDown';
import { apiConnector } from '../../services/api-connector';
import { categories } from '../../services/api';
import { IoIosArrowDropdown } from "react-icons/io";
import { setCategory } from '../../store/reducers/category-reducer';
import { logout } from '../../services/operations/authAPI';
import ConfirmationModal from './ConfirmationModal';

const Navbar = () => {
  const [hasShadow, setHasShadow] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const { isauthenticate} = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    Aos.init({ duration: 1000 });
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector('GET', categories.CATEGORIES_API);
      setSubLinks(result?.data?.Category);
      dispatch(setCategory(result?.data?.Category));

    } catch (error) {
      console.log('Could not fetch category list', error);
    }
  };
 

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const location = useLocation();
 console.log(location.pathname.split('/')[1]);
  const matchRoute = (route) => route===`/${location.pathname.split('/')[1]}`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] transition-shadow duration-300 ${hasShadow ? 'shadow-lg shadow-[#6674CC]' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 font-rubik w-11/12">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div>
            <Logo />
          </div>

          {/* Navbar Links */}
          <nav className="hidden md:flex space-x-8">
            {NavbarLinks.map((navbarLink, index) => (
              <div className="hidden md:flex space-x-8" key={index}>
                {navbarLink.title === 'Catalog' ? (
                  <div className="relative flex gap-2 group">
                    <p className={`hover:font-semibold ${matchRoute(navbarLink?.path) ? " text-[#6674CC]" :  "text-gray-50 hover:text-[#6674CC]" } transition-all duration-200`}>{navbarLink.title}</p>
                    <IoIosArrowDropdown className="pt-1 text-2xl" />
                    <div
                            className="absolute invisible flex flex-col rounded-2xl p-4 -left-[90%] top-[130%] translate-x-[50%] translate-y-[70%] group-hover:visible group-hover:opacity-100 md:w-[300px] bg-gradient-to-br from-white/40 to-gray-300/20 backdrop-blur-2xl shadow-2xl border border-gray-100/50 transition-all duration-200"
                            data-aos="zoom-in"
                          >
                            <div
                              className="absolute left-[50%] translate-x-[4%] top-[0%] -translate-y-2 rotate-[45deg] bg-gradient-to-br from-white/40 to-gray-300/20 backdrop-blur-2xl shadow-2xl border border-gray-100/50 h-5 w-5"
                            ></div>

                            {subLinks.length > 0 &&
                              subLinks.map((subLink, index) => (
                                <Link
                                  to={`/catalog/${subLink.name.split(' ').join('-').toLowerCase()}`}
                                  key={index}
                                  className={`hover:font-semibold transition-all duration-200 ${
                                    matchRoute(subLink.link)
                                      ? "text-[#6674CC]"
                                      : "text-[#fff] hover:text-[#6674CC]"
                                  }`}
                                >
                                  {subLink.name}
                                </Link>
                              ))}
                          </div>

                  </div>
                ) : (
                  <Link to={navbarLink?.path} className={`hover:font-semibold ${matchRoute(navbarLink?.path) ? " text-[#6674CC]" :  "text-gray-50 hover:text-[#6674CC]" } transition-all duration-200`}>
                    {navbarLink.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Cart and Profile */}
          <div className="md:flex hidden space-x-4 items-center">
            {isauthenticate && user.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className="relative">
                <FaShoppingCart  className='bg-red-600'/>
                {totalItems > 0 && (
                  <div className="absolute top-0 right-0 px-2 py-1 text-xs text-white bg-[#6674CC] rounded-full">
                    {totalItems}
                  </div>
                )}
              </Link>
            )}
            {!isauthenticate ? (
              <Link to='/login' className="px-4 py-2 bg-transparent border-4 border-gray-600 text-white hover:bg-[#6674CC] hover:scale-95 transition-all duration-200 rounded-lg">Login</Link>
            ) : (
              <ProfileDropDown />
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button className="text-gray-50 focus:outline-none" onClick={toggleMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>    
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4 bg-transparent p-4 rounded-lg  md:w-[300px] bg-gradient-to-br from-white/40 to-gray-300/20 backdrop-blur-2xl shadow-2xl border border-gray-100/50 transition-all duration-200">
            <Link to="/" className="text-center  text-gray-50 hover:text-[#6674CC] transition-all duration-200 font-semibold">Home</Link>
            <a onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)}  href="#courses" className="  text-center font-semibold text-gray-50 hover:text-[#6674CC] transition-all duration-200">Courses</a>
            <Link to="/about" className="text-center font-semibold text-gray-50 hover:text-[#6674CC] transition-all duration-200">About</Link>
            <Link to="/contact" className=" text-center font-semibold text-gray-50 hover:text-blue-600 transition-all duration-200">Contact</Link>
            <Link to="/signup" className={`${isauthenticate?"hidden":""} my-10 px-4 py-2 border-2 border-[#6674CC] text-white rounded hover:bg-blue-700 text-center hover:scale-95 transition-all duration-200 `}>Sign Up</Link>
            {isauthenticate&&
            <div className='flex justify-center gap-3 items-center mr-10'>
              <div className='pointer-events-none'><ProfileDropDown/></div>
              <Link to='/dashboard/my-profile'>Profile</Link>
              </div>
              }

        <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            
              } className=" text-sm px-5 hover:scale-95 transition-all duration-200 py-2 bg-red-300 text-center  rounded-md  text-red-600 hover:text-red-800">
            Logout
                  </button>
          </div>
        )}
         {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </nav>
   
  );
};

export default Navbar;
