import { div } from "framer-motion/client"
import { Link } from "react-router-dom";

const CourseCart = ({data,style})=>{
    return(
        <Link to={`/catalog/${data?.courseName.split(" ").join("-")}/${data._id}`} className="w-full mx-auto  rounded-3xl bg-[#1b1d1c] shadow p-2 flex flex-col justify-between hover:scale-95 transition-all duration-200"
        style={style}>
            <img src={data?.thumbnail} alt={data.title} className="rounded-3xl" />
            <div className="mt-3 px-4">
                <h2 className="font-semibold text-lg">{data?.courseName}</h2>
                <hr className="my-3 opacity-30"/>
                <h4>{data?.price}</h4>
            </div>
        </Link>
    )
}
export default CourseCart;