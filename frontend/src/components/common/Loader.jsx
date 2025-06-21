import React from "react";

const Loader = ({className}) => {
  return (
    <div className={`flex justify-center items-center h-screen bg-[#0f0f0f] ${className}`}>
      <div className="w-16 h-16 border-4 border-t-[#6d2a9c] border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
