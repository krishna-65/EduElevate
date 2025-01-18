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
    console.log(user);
    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);
            try {
                const instructorApiData = await getInstructorData(enqueueSnackbar);
                if (instructorApiData) {
                    setInstructorData(instructorApiData);
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
        <div>
            <div className="mx-3">
                <p className="text-xl font-semibold">Hi {user?.firstName} 👋</p>
                <p className="text-lg opacity-70 my-1">Let's start something new</p>
            </div>
            {instructorData && instructorData.length > 0 ? (
                <div className="mt-10">
                    <div className="flex flex-col-reverse lg:flex-row justify-between gap-5">
                        <InstructorChart courses={instructorData} />
                        <div className="bg-[#161515] p-10  lg:w-[30%]  m-4 rounded">
                            <p className="text-2xl mb-6">Statistics</p>
                            <div className="flex gap-5 my-2">
                                <p>Total Courses</p>
                                <p>{instructorData?.length || 0}</p>
                            </div> 
                            <div className="flex gap-5 my-2">
                                <p>Total Students</p>
                                <p>{instructorData?.totalStudentsEnrolled || 0}</p>
                            </div>
                            <div className="flex gap-5 my-2">
                                <p>Total Income</p>
                                <p>Rs {instructorData?.totalAmountGenerated || 0}</p>
                            </div>
                            <div>
                        <div>
                            <h3 className="my-5 text-lg">Your Courses</h3>
                            <Link to="/dashboard/my-courses" className="px-7 py-2 bg-yellow-500 text-gray-700 rounded font-semibold hver:scale-95 transition-all duration-200">View All</Link>
                        </div>
                        {courses.slice(0, 3).map((course, index) => (
                            <div key={index}>
                                <img src={course.thumbnail} alt={course.courseName} />
                                <div>
                                    <p>{course.courseName}</p>
                                    <div>
                                        <p>{course.studentsEnrolled?.length || 0} Students</p>
                                        <p> | </p>
                                        <p>Rs {course.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                             </div>
                        </div>
                    </div>

                 
                </div>
            ) : (
                <div>
                    <p>You have not created any course yet</p>
                    <Link to="/dashboard/add-course">Create a course</Link>
                </div>
            )}
        </div>
    );
};

export default Instructor;
