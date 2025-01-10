import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import IconBtn from "../../common/IconBtn";
import { VscLink } from "react-icons/vsc";

const MyProfile = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="py-5  md:px-5 "
        >
            <motion.h1
                variants={containerVariants}
                className="text-3xl text-white font-semibold mb-6"
            >
                My Profile
            </motion.h1>
            <div>
                {/* Section 1 */}
                <motion.div
                    variants={containerVariants}
                    className="  py-5 md:p-5 my-2 bg-[#161515] shadow rounded-md flex sm:flex-row flex-col gap-4 items-center justify-between"
                >
                    <div>
                        <div className="flex sm:flex-row flex-col gap-5 items-center">
                            <img
                                src={`${user?.image}`}
                                alt={`profile-${user?.firstName}`}
                                loading="lazy"
                                className="aspect-square w-[30px] sm:w-[40px] rounded-full object-cover"
                            />
                            <p className="font-rubik">
                                {user?.firstName + " " + user?.lastName}
                            </p>
                        </div>
                        <p className="  sm:ml-14 sm:text-md text-[10px] font-sans text-gray-400">
                            {user?.email}
                        </p>
                    </div>
                    <div className="flex bg-yellow-400 items-center text-[#333] px-1 sm:px-3 rounded-md hover:scale-95 hover:bg-yellow-500 transition-all duration-200">
                        <IconBtn
                            text="Edit"
                            onClick={() => navigate("/dashboard/settings")}
                        />
                        <VscLink className="sm:text-lg font-semibold" />
                    </div>
                </motion.div>

                {/* Section 2 */}
                <motion.div
                    variants={containerVariants}
                    className="p-5 my-3 bg-[#161515] shadow rounded-md flex sm:flex-row flex-col gap-3 items-center justify-between"
                >
                    <div>
                        <h3 className="text-md mb-1 font-semibold text-center sm:text-left">About</h3>
                        <p className="text-gray-400 md:text-md text-sm">
                            {user?.additionalDetails?.about ??
                                "Write Something About Yourself?"}
                        </p>
                    </div>
                    <div className="flex bg-yellow-400 items-center text-[#333] px-1 sm:px-3 rounded-md hover:scale-95 hover:bg-yellow-500 transition-all duration-200">
                        <IconBtn
                            text="Edit"
                            onClick={() => navigate("/dashboard/settings")}
                        />
                        <VscLink className="sm:text-lg font-semibold" />
                    </div>
                </motion.div>

                {/* Section 3 */}
                <motion.div
                    variants={containerVariants}
                    className="p-5 my-3 bg-[#161515] shadow rounded-md flex flex-col justify-between"
                >
                    <div className="flex sm:flex-row flex-col gap-3 justify-between">
                        <h3 className="text-md font-semibold">Personal Details</h3>
                        <div className="flex  bg-yellow-400 items-center text-[#333] px-1 sm:px-3 rounded-md hover:scale-95 hover:bg-yellow-500 transition-all duration-200">
                            <IconBtn
                                text="Edit"
                                onClick={() => navigate("/dashboard/settings")}
                            />
                            <VscLink className="sm:text-lg font-semibold" />
                        </div>
                    </div>

                    <div className="grid mt-4  gap-3 sm:grid-cols-2">
                        <div >
                            <p className="text-gray-500">First Name</p>
                            <p className="text-sm sm:text-lg">{user?.firstName}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Last Name</p>
                            <p className="text-sm sm:text-lg">{user?.lastName}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Email</p>
                            <p className="text-sm sm:text-lg">{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Gender</p>
                            <p className="text-sm sm:text-lg">
                                {user?.additionalDetails?.gender ??
                                    "Add Your Gender"}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500">Phone Number</p>
                            <p className="text-sm sm:text-lg">
                                {user?.additionalDetails?.phone ??
                                    "Add Contact Number"}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500">Date of Birth</p>
                            <p className="text-sm sm:text-lg">
                                {user?.additionalDetails?.dateOfBirth ??
                                    "Add Date Of Birth"}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MyProfile;
