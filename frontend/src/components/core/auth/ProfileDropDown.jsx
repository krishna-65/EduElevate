import { useState } from "react";
import { FaDiscourse } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { CiSettings } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useSnackbar } from "notistack";
const ProfileDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const {enqueueSnackbar} =useSnackbar();

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  const user = useSelector((state) => state.profile.user);
  console.log(user);

  // Close dropdown when clicking outside
  const handleClose = (e) => {
    if (!e.target.closest(".profile-dropdown")) {
      setIsOpen(false);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
        dispatch(logout());
  }

  // Add an event listener to the document for outside clicks
  document.addEventListener("click", handleClose);

  return (
    confirmationModal ? <ConfirmationModal modalData={confirmationModal}/>
    :<div className="relative profile-dropdown">
      {/* Profile Icon */}
      <img
        src={user.image}
        onClick={handleOnClick}
        className="h-10 w-10 rounded-full bg-gray-200 ml-10 cursor-pointer"
      />

      {/* Dropdown Menu */}
      <div
        className={`${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        } absolute right-0 mt-2 transform transition-all duration-200 origin-top-right z-10`}
      >
        <div className="bg-white rounded-xl shadow-lg w-72">
          {/* Arrow */}
          <div className="absolute -top-2 right-4 bg-white h-4 w-4 transform rotate-45"></div>

          {/* Content */}
          <div className="p-4">
            <div className="text-md mb-2 text-center font-semibold text-gray-800">{user.firstName} {user.lastName}</div>
            <div className="text-sm text-gray-500">Student</div>
            <div className="text-sm text-gray-500 mb-3">EduElevate</div>
            <hr className="my-3 border-gray-300" />

            <div className="flex flex-col gap-2">
            <div className="flex justify-between">
            <button className="text-left text-sm text-gray-700 hover:text-gray-900">
                Courses
              </button>
              <FaDiscourse className="text-black"/>
            </div>
            <div className="flex justify-between">
              <button className="text-left text-sm text-gray-700 hover:text-gray-900">
                Progress
              </button>
              <GiProgression className="text-black"/>
            </div>
            <div className="flex justify-between">
              <button className="text-left text-sm text-gray-700 hover:text-gray-900">
                Settings
              </button>
              <CiSettings className="text-black"/>
              </div>
              <div className="flex justify-between my-4">
              <button onClick={() =>
                               setConfirmationModal({
                                              text1: "Are you sure?",
                                              text2: "You will be logged out of your Account",
                                              btn1Text: "Logout",
                                              btn2Text: "Cancel",
                                              btn1Handler: () => dispatch(logout(navigate, enqueueSnackbar)), // Correct usage of dispatch
                                              btn2Handler: () => setConfirmationModal(null),
                                              })
                                          } className="text-left text-sm px-5 hover:scale-95 transition-all duration-200 py-2 bg-red-300  rounded-md  text-red-600 hover:text-red-800">
                Logout
              </button>
              <button onClick={()=> navigate('/dashboard/my-profile')} className="text-center rounded-md px-5 py-2 text-sm transition-all duration-200 hover:scale-95  bg-blue-800 text-white">More Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;
