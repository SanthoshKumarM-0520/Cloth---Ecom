import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div>
      <div className="flex  gap-2 items-center">
        <p className="text-gray-500 ">{text1}</p>
        <p className="text-gray-700 font-medium">{text2}</p>
        <p className=" w-8 sm:w-12 h-[2px] bg-gray-700"></p>
      </div>
    </div>
  );
};

export default Title;
