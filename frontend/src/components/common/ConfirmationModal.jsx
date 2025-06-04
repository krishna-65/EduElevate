import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
    
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      {/* Modal Content */}
      <div className="bg-[#0f0f0f] rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center">
        {/* Modal Text */}
        <p className="text-lg font-semibold text-white">{modalData?.text1}</p>
        <p className="mt-2 text-sm text-gray-400">{modalData?.text2}</p>

        {/* Modal Buttons */}
        <div className="flex justify-center mt-6 gap-4">
          {/* Primary Button */}
          <IconBtn
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            className="bg-red-500 hover:bg-red-600 text-white transition-all duration-150 hover:scale-95"
          />
          {/* Secondary Button */}
          <button
            onClick={modalData?.btn2Handler}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-300 text-sm font-medium rounded transition-all duration-150 hover:scale-95"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
