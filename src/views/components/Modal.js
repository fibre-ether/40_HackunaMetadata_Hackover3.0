import React from "react";
// import { RiDeleteBin6Line, RiDeleteBin6Fill } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";

function Modal() {
  return (
    <div>
      <div
        className="image min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
        id="modal-id"
      >
        <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
        <div className="w-full h-70 max-w-lg relative rounded-xl shadow-lg  bg-white ">
          <div className="">
            <div className="text-center pt-5 pb-3 flex-auto justify-center">
              {/* <img src={logo} alt="img-url" classname="w-20 h-20" /> */}
              <h2 className="text-xl font-bold py-4 ">Event Title!!</h2>
              <p className="text-sm text-gray-500 px-8">
                Description Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Ipsa aut debitis quaerat assumenda itaque soluta, enim
                quod quo minima placeat.
              </p>
              <div className="py-3 d-flex">
                <p className="mx-auto">Time1:00:00:00</p>
                <p className="mx-auto">Time2:00:00:00</p>
              </div>
            </div>
            <div className="flex pb-2 items-center justify-center pt-3  mt-2 text-center space-x-4 md:block">
              <button className="flex justify-center align-center mb-2  bg-white px-3 py-3 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-300 h-14 w-14">
                <MdOutlineDeleteOutline size={30} className=" text-red-500 " />
              </button>
              <button className="h-14 mb-2 md:mb-0 border-2 border-red-500 px-4 py-1 text-sm shadow-sm font-medium tracking-wider text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                Cancel/Edit
              </button>
              <button className="h-14 mb-2 md:mb-0 bg-blue-500 border px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600">
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
