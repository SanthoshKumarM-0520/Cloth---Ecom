import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-25">
      <p className="w-full bg-black h-[1px] mb-5"></p>
      <div className="flex flex-col gap-10 sm:flex-row  sm:gap-8 lg:gap-20">
        <div className="lg:w-3/5">
          <img src={assets.logo} className="w-35" alt="" />
          <p className="mt-2 sm:mt-5 lg:pr-50  text-gray-600 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
            quisquam eum soluta repudiandae earum non quidem labore et delectus
            voluptates.
          </p>
        </div>
        <div className="lg:w-1/5">
          <p className="text-xl font-medium">COMPANY</p>
          <ul className="flex flex-col mt-2 sm:mt-8 text-gray-600 text-sm">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="lg:w-1/5">
          <p className="text-xl font-medium ">GET IN TOUCH</p>
          <p className="sm:2 sm:mt-8 text-sm text-gray-600">+1-222-654-9870</p>
          <p className="text-sm text-gray-600">contact@looma.com</p>
        </div>
      </div>
      <p className="w-full bg-gray-200 h-[1px] mx-auto mt-5"></p>
      <p className="text-sm text-center p-5">
        Copyright2025@looma.com-All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
