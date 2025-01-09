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
                    setCourses(instructorApiData.courses || []); // Use courses from the API response
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
            <div>
                <p className="text-xl font-semibold">Hi {user?.firstName} 👋</p>
                <p className="text-lg opacity-70 my-1">Let's start something new</p>
            </div>
            {instructorData && instructorData.courses && instructorData.length > 0 ? (
                <div>
                    <div>
                        <InstructorChart courses={instructorData.courses} />
                        <div>
                            <p>Statistics</p>
                            <div>
                                <p>Total Courses</p>
                                <p>{instructorData?.courses?.length || 0}</p>
                            </div>
                            <div>
                                <p>Total Students</p>
                                <p>{instructorData?.totalStudentsEnrolled || 0}</p>
                            </div>
                            <div>
                                <p>Total Income</p>
                                <p>Rs {instructorData?.totalAmountGenerated || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <h3>Your Courses</h3>
                            <Link to="/dashboard/my-courses">View All</Link>
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
