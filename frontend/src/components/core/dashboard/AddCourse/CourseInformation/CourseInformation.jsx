import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setStep } from "../../../../../store/reducers/course-reducers";
import Upload from "../Upload";
import ChipInput from "./ChipInput";
import RequirementFields from "./RequirementFields";
import { enqueueSnackbar } from "notistack";
import { COURSE_STATUS } from "../../../../../utils/constants";
import Loader from "../../../../common/Loader";
import { addCourseDetails, editCourseDetails } from "../../../../../services/operations/courseAPI";

const CourseInformation = () => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    if (editCourse) {
      setValue("courseName", course?.courseName || "");
      setValue("courseDescription", course?.courseDescription || "");
      setValue("price", course?.price || "");
      setValue("thumbnail", course?.thumbnail || "");
      setValue("category", course?.category._id || "");
      setValue("instructions", course?.instructions || []);
      setValue("whatYouWillLearn", course?.whatYouWillLearn || "");
      setValue("tag", course?.tag || []);
    }
  }, [editCourse, course, setValue]);

  const isFormUpdated = () => {
    const currentValue = getValues();
    return (
      currentValue.courseName !== course?.courseName ||
      currentValue.courseDescription !== course?.courseDescription ||
      currentValue.category !== course?.category._id ||
      currentValue.price !== course?.price ||
      currentValue.instructions.toString() !== course?.instructions.toString() ||
      currentValue.tag.toString() !== course?.tag.toString() ||
      currentValue.whatYouWillLearn !== course?.whatYouWillLearn
    );
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const formData = new FormData();
        formData.append("courseId", course._id);
        const currentValue = getValues();
        if (currentValue.courseName !== course.courseName) {
          formData.append("courseName", data.courseName);
        }
        if (currentValue.courseDescription !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription);
        }
        if (currentValue.price !== course.price) {
          formData.append("price", data.price);
        }
        // if (currentValue.thumbnail !== course.thumbnail && data.thumbnail instanceof File) {
        //   formData.append("thumbnail", data.thumbnail); // Include new file
        // } else if (!data.thumbnail && course.thumbnail) {
        //   formData.append("thumbnail", course.thumbnail); // Use the old thumbnail if not changed
        // }
        if (currentValue.category !== course.category._id) {
          formData.append("category", data.category);
        }
        if (currentValue.whatYouWillLearn !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.whatYouWillLearn);
        }
        if (currentValue.instructions.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.instructions));
        }
        if (currentValue.tag.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.tag));
        }
        setLoading(true);
        const result = await editCourseDetails(formData);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
        setLoading(false);
      } else {
        dispatch(setStep(2));
        enqueueSnackbar("No changes made to the form", { variant: "info" });
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.price);
    formData.append("tag", JSON.stringify(data.tag));
    formData.append("whatYouWillLearn", data.whatYouWillLearn);
    formData.append("category", data.category);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.instructions));

    // Ensure the file is included if present
    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    } else if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail); // If the thumbnail is a URL or fallback value
    } else {
      enqueueSnackbar("Missing required file: thumbnail", { variant: "error" });
      return; // Return if no file or URL is found
    }

    setLoading(true);
    const result = await addCourseDetails(formData);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <form
        className="rounded-md shadow bg-[#161515] p-5 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Course Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="courseName">
            Course Title <sup className="text-red-400">*</sup>
          </label>
          <input
            type="text"
            id="courseName"
            className="bg-transparent border-2 border-gray-800 px-4 py-2 text-sm"
            placeholder="Enter your course title"
            {...register("courseName", { required: "Course Title is required" })}
          />
          {errors.courseName && <p className="text-red-500 text-sm">{errors.courseName.message}</p>}
        </div>

        {/* Course Description */}
        <div className="flex flex-col gap-2">
          <label htmlFor="courseDescription">
            Course Short Description <sup className="text-red-400">*</sup>
          </label>
          <textarea
            id="courseDescription"
            placeholder="Enter Description"
            className="bg-transparent border-2 border-gray-800 px-4 py-2 text-sm"
            {...register("courseDescription", { required: "Description is required" })}
          />
          {errors.courseDescription && (
            <p className="text-red-500 text-sm">{errors.courseDescription.message}</p>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="bg-[#161515] border-2 border-gray-800 px-4 py-2 text-sm text-white"
            {...register("category", { required: true })}
          >
            <option value="" className="text-gray-400">
              Select Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category._id} className="text-white">
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label htmlFor="price">
            Price <sup className="text-red-400">*</sup>
          </label>
          <input
            type="number"
            id="price"
            className="bg-transparent border-2 border-gray-800 px-4 py-2 text-sm"
            placeholder="Enter price"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Thumbnail Upload */}
        <Upload
          name="thumbnail"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

        {/* Tags */}
        <ChipInput
          label="Tags"
          name="tag"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Benefits */}
        <div className="flex flex-col gap-2">
          <label htmlFor="whatYouWillLearn">
            Benefits of the course <sup className="text-red-400">*</sup>
          </label>
          <textarea
            id="whatYouWillLearn"
            className="bg-transparent border-2 border-gray-800 px-4 py-2 text-sm"
            placeholder="What students will learn"
            {...register("whatYouWillLearn", { required: "Course Benefits are required" })}
          />
          {errors.whatYouWillLearn && (
            <p className="text-red-500 text-sm">{errors.whatYouWillLearn.message}</p>
          )}
        </div>

        {/* Instructions */}
        <RequirementFields
        label={"Requirement/Instructions"}
          name="instructions"
          setValue={setValue}
          errors={errors}
          register={register}
          getValues={getValues}
        />

        {/* Submit Button */}
        <div className="w-full flex gap-4">
          <button type="submit" className="btn btn-primary w-full rounded hover:scale-95 transition-all duration-200 py-2 text-lg px-7 bg-blue-700 ">
            {editCourse ? "Save Changes" : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
