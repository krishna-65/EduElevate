import { Link } from "react-router-dom";
import { FooterLink2 } from "../data/footer-links";
import Logo from "./common/Logo";
import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { div } from "framer-motion/client";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer = () =>{

    useEffect(()=>{
        Aos.init({
            duration: 1000,
        });
    },[])

        

        const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
            const Resources = [
            "Articles",
            "Blog",
            "Chart Sheet",
            "Code challenges",
            "Docs",
            "Projects",
            "Videos",
            "Workspaces",
            ];
            const Plans = ["Paid memberships", "For students", "Business solutions"];
            const Community = ["Forums", "Chapters", "Events"];

    return (
            <div className="w-full bg-[#0f0f0f] pb-10">
                   <div className="w-11/12 flex flex-col  mx-auto  pt-32 " data-aos="fade-down">
                            <div className="w-full flex flex-col lg:flex-row justify-between mx-auto l  ">
                                        <div className=" grid grid-cols-1 sm:grid-cols-2  px-4 ">
                                    <div className="flex flex-col mt-20">
                                        <Logo className={`sm:text-3xl text-xl`}/>
                                        <p className="text-[#d7dae4]">Company</p>
                                        <ul className="mt-2">
                                            <li className="text-[#6e727f] text-sm"> About</li>
                                            <li className="text-[#6e727f] text-sm">Careers</li>
                                            <li className="text-[#6e727f] text-sm">Affilates</li>
                                        </ul>
                                    </div>
                                        <div className="flex w-[80%] flex-col sm:flex-row gap-20 md:w-[50%] justify-between">
                                        <div className="mt-20">
                                        <h2 className="text-[#d7dae4] mb-3">Resources</h2>
                                        <div className="flex flex-col gap-2">
                                            {Resources.map((resource,index)=>(
                                                <Link key={index} className="text-[#6e727f] text-sm " to={`/resources/${resource.toLowerCase()}`}>{resource}</Link>
                                                ))}
                                            </div>
                                            <h2 className="text-[#d7dae4] mt-8 mb-1">Support</h2>
                                            <Link className="text-[#6e727f] text-sm " to={`/support/helpcenter`}>Htlp Cenetr</Link>
                        
                                    </div>
                                    <div className="mt-20">
                                        <h2 className="text-[#d7dae4] mb-3">Plans</h2>
                                        <div className="flex flex-col gap-2">
                                            {Plans.map((plan,index)=>(
                                                <Link key={index} className="text-[#6e727f] text-sm " to={`/plans/${plan.toLowerCase()}`}>{plan}</Link>
                                                ))}
                                            </div>
                                            
                                        <h2 className="text-[#d7dae4] mt-8 mb-1">Community</h2>
                                        <div className="flex flex-col gap-2">
                                            {Community.map((community,index)=>(
                                                <Link key={index} className="text-[#6e727f] text-sm " to={`/community/${community.toLowerCase()}`}>{community}</Link>
                                                ))}
                                            </div>
                                    
                                    </div>
                                        </div>
                                        </div>
                            
                                    <div className="w-[1px] mt-20 hidden lg:block h-[70vh] my-auto bg-white opacity-10"></div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:mt-0 mt-20 px-4 ">   
                                        {FooterLink2.map((section,index)=>(
                                            <div key={index} className="mt-20 ">
                                                    <h2 className="text-[#d7dae4] mb-3">{section.title}</h2>
                                                    <div className="flex flex-col gap-2" >
                                                    {section.links.map((link,index)=>(
                                                        <Link className="text-[#6e727f] text-sm " to={link.link}>{link.title}</Link>
                                                        ))}
                                                    </div>
                                        </div>))}
                                        </div>
                            </div>
                            
                            <h2 className="w-[80%] opacity-20 mx-auto my-10 h-[1px] bg-white"></h2>

                            <div className="flex text-[#d7dae4] flex-col items-center">
                                <div>
                                    <Link className="border-r px-3 text-sm sm:text-md sm:px-7">Privacy</Link>
                                    <Link className="text-sm sm:text-md  border-r px-3 sm:px-7">Policy</Link>
                                    <Link className="text-sm sm:text-md px-3 sm:px-7">Terms</Link>
                                </div>
                                <h2 className="text-center text-[#d7dae4] text-md my-2">Made with ❤️ Krishnakant Sharma © 2024 <Logo className={`inline-block text-md`}/></h2>

                                <div className="flex text-[#d7dae4]  gap-5 text-xl">
                                    <a href="/facebook"><FaFacebook/></a>
                                    <a href="/instagram"><FaInstagram/></a>
                                    <a href="/linkedin"><FaLinkedin/></a>
                                    <a href="/github"><FaGithub/></a>
                                </div>
                            </div>                
                    </div>
            </div>
    )
}
export default Footer;
