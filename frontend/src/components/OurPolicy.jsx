import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col mt-30 sm:flex-row sm:gap-2">
      <div className=" flex flex-col items-center  bg-gray-50 border border-gray-200 w-full p-5">
        <img src={assets.exchange_icon} className="w-12 " alt="" />
        <p className="font-semibold mt-3">Easy Exchange Policy</p>
        <p className="text-gray-600 text-center">
          We offer hassle Free Exchange policy
        </p>
      </div>
      <div className=" flex flex-col items-center  bg-gray-50 border border-gray-200 w-full p-5">
        <img src={assets.quality_icon} className="w-12 " alt="" />
        <p className="font-semibold mt-3">Easy Exchange Policy</p>
        <p className="text-gray-600 text-center">
          We provide 7 days free return policy
        </p>
      </div>
      <div className=" flex flex-col items-center  bg-gray-50 border border-gray-200 w-full p-5">
        <img src={assets.support_img} className="w-12 " alt="" />
        <p className="font-semibold mt-3">Easy Exchange Policy</p>
        <p className="text-gray-600 text-center">
          We provide 24/7 customer support
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
