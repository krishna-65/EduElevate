import React from "react";
const Logo = ({className})=>{
    return (
        <div className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-[#6674CC] via-[purple] to-[orange] ${className}`}>
        EduElevate {/* Replace this with your logo */}
      </div>
    )
}
export default Logo;