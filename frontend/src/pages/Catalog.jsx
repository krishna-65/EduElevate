import { Link, useParams } from "react-router-dom";
import Navbar from "../components/common/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getALLCourses, getCategoryPageDetails } from "../services/operations/courseAPI";
import CourseCart from "../components/common/CourseCart";
import Footer from "../components/Footer";
import Loader from "../components/common/Loader";

const Catalog = () => {
    const { name } = useParams();
    const [selectedCategory, setSelectedCategory] = useState();
    const [courses, setCourses] = useState(null);
    const dispatch = useDispatch();

    const formattedName = name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const { categories } = useSelector((state) => state.category);

    useEffect(() => {
        const filteredCategory = categories?.filter(
            (category) => category.name === formattedName
        );
        setSelectedCategory(filteredCategory[0]);
    }, [name]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getCourses = async () => {
            setLoading(true);
            try {
                // const response = await getCategoryPageDetails(selectedCategory._id);
                const response = await getALLCourses();
                setCourses(response);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        if (selectedCategory?._id) {
            getCourses();
        }
    }, [selectedCategory]);

    return (
        <>
            <Navbar />

            <div className="mt-32 p-10 pb-32 bg-[#161515] rounded-b-xl">
                <h1 className="text-white">
                    <Link to="/" className="text-[#6674CC] hover:underline">
                        Home
                    </Link>{" "}
                    / Catalog /{" "}
                    <span className="text-[#6674CC]">{selectedCategory?.name}</span>
                </h1>
                <p className="text-[#6674CC] text-2xl font-semibold leading-10 mt-2">
                    {selectedCategory?.name}
                </p>
                <p className="text-gray-400 text-lg mt-2">{selectedCategory?.description}</p>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="p-10">
                        <p className="text-2xl font-semibold text-white mb-6">{selectedCategory?.name}</p>
                        {/* {courses?.selectCategoryCourses?.course.length > 0 ? */}

                        {courses &&  courses.length > 0 ? (
                            <div className="mx-auto grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-8 py-10">
                                {/* {courses.selectCategoryCourses.course.map((course, index) => (
                                    <CourseCart key={index} data={course} />
                                ))} */}
                                  {courses.map((course, index) => (
                                    <CourseCart key={index} data={course} />
                                ))}
                            </div>
                        ) : (
                            <div className="my-10 text-center text-gray-500">
                                <p>No courses found in this category.</p>
                            </div>
                        )}
                    </div>

                    {courses?.topSellingCourses?.length > 0 && (
                        <div className="p-10 bg-[#1e1e1e] rounded-xl mt-10">
                            <p className="text-2xl font-semibold text-white mb-6">Top Selling Courses</p>
                            <div className="mx-auto grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-8 py-10">
                                {courses.topSellingCourses.map((course, index) => (
                                    <CourseCart key={index} data={course} />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            <Footer />
        </>
    );
};

export default Catalog;
