import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row  border border-gray-400 ">
      {/* Hero Right Side */}
      <img src={assets.bannerImg2} className="w- full sm:w-1/2" alt="" />
      {/* Hero Left Side */}
      <div className=" w-full  sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141] py-3">
          <div className="flex items-center gap-2">
            <p className="w-8 bg-[#414141] h-[2px]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className=" prata-regular text-2xl lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 bg-[#414141] h-[1px]"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
