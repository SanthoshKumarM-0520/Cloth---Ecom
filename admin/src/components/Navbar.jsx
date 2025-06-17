import React from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    setToken("");
  };
  return (
    <>
      <div className="flex justify-between items-center py-2">
        <img src={assets.logo} className="w-25 " alt="" />
        <div className="bg-gray-600  rounded-full text-white cursor-pointer">
          <p
            onClick={handleLogout}
            className="px-4 py-1 md:px-6 md:py-2 text-sm"
          >
            Logout
          </p>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Navbar;
