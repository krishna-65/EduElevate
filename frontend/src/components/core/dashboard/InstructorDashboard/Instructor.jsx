import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { getInstructorData } from "../../../../services/operations/ProfileAPI";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader";
import InstructorChart from "./InstructorChart";
import { Link } from "react-router-dom";

const Instructor = () => {
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);
    const { user } = useSelector((state) => state.profile);

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);
            try {
                const instructorApiData = await getInstructorData(enqueueSnackbar);
                if (instructorApiData) {
                    setInstructorData(instructorApiData);
                    setCourses(instructorApiData); // Assuming course data is directly available
                }
            } catch (error) {
                enqueueSnackbar(error?.message || "Unable to fetch courses", { variant: "error" });
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getCourseDataWithStats();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="bg-[#101010] min-h-screen p-6 lg:p-12">
            <div className="mx-3">
                <p className="text-2xl font-semibold text-white">Hi {user?.firstName} 👋</p>
                <p className="text-lg opacity-70 text-white mt-1">Let's start something new!</p>
            </div>
            {instructorData && instructorData.length > 0 ? (
                <div className="mt-10 flex flex-col lg:flex-row gap-10">
                
                        <InstructorChart courses={instructorData} />
                

                    {/* Instructor Statistics Section */}
                    <div className="lg:w-[30%] bg-[#161515] p-6 rounded-xl shadow-lg">
                        <p className="text-2xl font-semibold text-white mb-6">Statistics</p>
                        <div className="text-white mb-4">
                            <div className="flex justify-between mb-2">
                                <p>Total Courses</p>
                                <p>{instructorData?.length || 0}</p>
                            </div>
                            <div className="flex justify-between mb-2">
                                <p>Total Students</p>
                                <p>{instructorData?.totalStudentsEnrolled || 0}</p>
                            </div>
                            <div className="flex justify-between mb-4">
                                <p>Total Income</p>
                                <p>Rs {instructorData?.totalAmountGenerated || 0}</p>
                            </div>
                        </div>

                        {/* Your Courses Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Your Courses</h3>
                            <Link
                                to="/dashboard/my-courses"
                                className="px-6 py-3 bg-yellow-500 text-gray-700 rounded-full hover:bg-yellow-600 transition-all duration-200 mb-4 block text-center"
                            >
                                View All
                            </Link>
                           
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-white mt-10">
                    <p>You have not created any course yet.</p>
                    <Link
                        to="/dashboard/add-course"
                        className="mt-4 px-6 py-3 bg-yellow-500 text-gray-700 rounded-full hover:bg-yellow-600 transition-all duration-200"
                    >
                        Create a Course
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Instructor;
