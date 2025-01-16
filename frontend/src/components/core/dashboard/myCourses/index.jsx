import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse } from "../../../../store/reducers/course-reducers";
import { useNavigate } from "react-router-dom";
import Loader from "../../../common/Loader";
import { enqueueSnackbar } from "notistack";
import { fetchInstructorCourses } from "../../../../services/operations/courseAPI";
import Course from "./Course";

const MyCourses = () => {
    const [loading, setLoading] = useState(false);
    const [courses,setCourses] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getIntructorCourses = async () => {
            try {
                setLoading(true);
                const response = await fetchInstructorCourses(enqueueSnackbar); // Replace with `dispatch(getInstructorData)` if needed
                setCourses(response);
            } catch (error) {
                console.log("Error fetching instructor courses", error);
                enqueueSnackbar("Error fetching instructor courses", { variant: "error" });
            } finally {
                setLoading(false);
            }
        };
        getIntructorCourses();
    }, []);

    const handleEdit = (course) => {
        dispatch(setCourse(course));
        dispatch(setEditCourse(true));
        navigate("/dashboard/add-course");
    }

    if (loading) {
        return <Loader />;
    }

    if (!courses || courses.length === 0) {
        return <p>No courses available.</p>;
    }

    return (
        <div className="p-4 flex flex-col gap-10 ">
            {courses.map((course,index) => (
              <Course key={index} course={course} user="Instructor" handleEdit={handleEdit}/>
            ))}
        </div>
    );
};

export default MyCourses;


