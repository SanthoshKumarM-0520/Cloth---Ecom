import React from "react";

const NewsletterBox = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className=" text-center mt-24">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        dignissimos sint illum!
      </p>

      <form onSubmit={submitHandler} className="flex justify-center mt-7 ">
        <input
          type="email"
          className="border border-b-black rounded-none p-3 sm:w-1/3"
          required
          placeholder="Enter your email"
        />
        <button className="px-10 py-4 text-white text-xs bg-black cursor-pointer ">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
