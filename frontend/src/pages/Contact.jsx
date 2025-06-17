import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <p className="w-full bg-black h-[1px]"></p>
      <div className="text-2xl flex justify-center mt-10">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="flex flex-col mt-13 md:flex-row  md:justify-center">
        <img src={assets.contact_img} alt="" className="md:w-[35%]" />
        <div className="flex flex-col md:pl-10 md:justify-center">
          <p className="mt-10 md:mt-0 font-bold text-2xl ">Our Store</p>
          <p className="text-gray-500 mt-3">
            54709 Willms Station <br />
            Suite 350,Washington,USA
          </p>
          <p className="text-gray-500 mt-3">
            Tel: (415) 555-0132 <br />
            Email: admin@looma.com
          </p>
          <p className="mt-5 font-bold text-2xl">Careers at Looma</p>
          <p className="text-gray-500 mt-3">
            Learn more about our teams and job openings
          </p>
          <button className="border px-7 py-4 mt-5 hover:bg-black hover:text-white hover:transition-all duration-500 cursor-pointer">
            Explore jobs
          </button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
