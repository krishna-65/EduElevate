import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"
import CourseInformation from "./CourseInformation/CourseInformation"
import CourseBuilder from "./courseBuider/CourseBuilder"
import PublishCourse from "./publish/Published"





export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      <div className="relative mb-2 flex w-full justify-center ">
        {steps.map((item,i) => (
          <>
            <div
              className="flex flex-col items-center "
              key={i}
            >
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-white  bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-300 text-yellow-50"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold  text-gray-800" />
                ) : (
                  item.id
                )}
              </button>
              
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[25%] md:w-[33%]  border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-around ">
        {steps.map((item) => (
          <>
            <div
              className="flex min-w-[100px]  flex-col items-center gap-y-2"
              key={item.id}
            >
              
              <p
                className={`text-[10px] sm:text-sm  `}
              >
                {item.title}
              </p>
            </div>
            
          </>
        ))}
      </div>
      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformation />}
      {step === 2 && <CourseBuilder />}
      {step === 3 &&  <PublishCourse /> }
    </>
  )
}