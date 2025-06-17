import React from "react";
import Title from ".././components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <p className="w-full bg-black h-[1px]"></p>
      <div className="flex justify-center text-2xl mt-10">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="flex flex-col md:flex-row mt-15 gap-5">
        <img src={assets.about_img} alt="" className="md:w-[35%]" />
        <div className="flex flex-col mt-10 md:w-[60%] md:ml-8 md:mt-0 md:justify-center">
          <p className="mt-3 text-gray-600">
            Driven by innovation and customer focus, we’re redefining online
            shopping with a platform built for simplicity, speed, and
            satisfaction.
          </p>
          <p className="mt-5 text-gray-600">
            We’ve created a place where great products, secure checkout, and
            caring service come together to give you the shopping experience you
            deserve.
          </p>
          <p className="font-medium mt-5 text-2xl">Our Mission</p>
          <p className="mt-5 text-gray-600">
            Our mission is to deliver a shopping experience that’s effortless,
            reliable, and built around your needs—bringing quality products and
            trusted service to your fingertips.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <div>
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>
        <div className="flex flex-col md:flex-row gap-2 mt-5">
          <div className="border p-10 md:w-[33%]">
            <p className="md:text-center">Quality Assurance</p>
            <p className="md:text-center text-sm text-gray-500 mt-5">
              We’re committed to delivering only the best. Every product
              undergoes a thorough quality check to ensure it meets our
              standards—so you receive nothing less than what you deserve.
            </p>
          </div>
          <div className="border p-10 md:w-[33%]">
            <p className="md:text-center">Convenince</p>
            <p className="md:text-center text-sm text-gray-500 mt-5">
              One platform. Countless products. Zero hassle. We’re here to make
              your shopping experience as effortless as it should be.
            </p>
          </div>
          <div className="border p-10 md:w-[33%]">
            <p className="md:text-center">Exceptional Customer Service</p>
            <p className="md:text-center text-sm text-gray-500 mt-5">
              We treat every customer like our only customer. Fast responses,
              real support, and a team that truly listens—that’s the service we
              believe in.
            </p>
          </div>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
