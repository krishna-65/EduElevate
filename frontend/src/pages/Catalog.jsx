import { useParams } from "react-router-dom";
import Navbar from "../components/common/Nav";

const Catalog = ()=>{
    const {name} = useParams();
   
    return(
        <>
            <Navbar/>
    
            <div className="mt-32 p-5 bg-[#161515]">
                    <h1 className="text-white">Home/Catalog/<span className="text-[#6674CC]">{name.split('-').join(" ").toUpperCase()}</span></h1>
                    <span className="text-[#6674CC] text-lg leading-10 font-semibold">{name.split('-').join(" ").toUpperCase()}</span>
            </div>
        </>
    )
}
export default Catalog;