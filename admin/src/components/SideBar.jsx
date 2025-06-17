import React, { useEffect } from "react";
import { useState } from "react";

import { assets } from "../assets/assets";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [adminDashboard, setAdminDashboard] = useState(() => {
    if (location.pathname == "/") {
      return "dashboard";
    } else {
      return location.pathname.split("/")[1];
    }
  });

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/dashboard");
    } else {
      navigate(location.pathname);
    }
  }, []);

  return (
    <div className=" w-[25%] md:w-[20%] lg:w-[15%] border-r-1 border-gray-400 pt-5">
      <div className="flex flex-col  sm:flex-row sm:gap-2 items-center sm:pl-3">
        <img
          src={assets.admin_profile}
          className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-pink-400 shadow-lg shadow-pink-400/50"
          alt=""
        />
        <div className="text-center sm:text-left">
          <b className="text-sm text-gray-700">sandy</b>
          <p className=" sm:block text-sm text-gray-500">Senior admin</p>
        </div>
      </div>
      <p className="bg-gray-400 h-[1px] mt-5 "></p>
      <div className="">
        <NavLink
          to={"/dashboard"}
          onClick={() => setAdminDashboard("dashboard")}
          className={`flex justify-center sm:justify-normal gap-4 items-center  py-2 sm:pl-3 cursor-pointer ${
            adminDashboard == "dashboard"
              ? "bg-[#ffebf5] border border-[#c586a5] rounded"
              : ""
          } `}
        >
          <img src={assets.dashboard} className="w-8" alt="" />
          <p className={`hidden sm:block text-gray-500 hover:text-black`}>
            Dashboard
          </p>
        </NavLink>
        <p className="bg-gray-200 h-[1px]  "></p>
        <NavLink
          to={"/listitems"}
          onClick={() => setAdminDashboard("listitems")}
          className={`flex justify-center sm:justify-normal gap-4 items-center  py-2 sm:pl-3 cursor-pointer ${
            adminDashboard == "listitems"
              ? "bg-[#ffebf5] border border-[#c586a5] rounded"
              : ""
          }`}
        >
          <img src={assets.listed_itm} className="w-8" alt="" />
          <p className="hidden sm:block text-gray-500 hover:text-black">
            List Items
          </p>
        </NavLink>
        <p className="bg-gray-200 h-[1px]  "></p>
        <NavLink
          to={"/orders"}
          onClick={() => setAdminDashboard("orders")}
          className={`flex justify-center sm:justify-normal gap-4 items-center  py-2 sm:pl-3 cursor-pointer ${
            adminDashboard == "orders"
              ? "bg-[#ffebf5] border border-[#c586a5] rounded"
              : ""
          }`}
        >
          <img src={assets.orders} className="w-8" alt="" />
          <p className="hidden sm:block text-gray-500 hover:text-black">
            Orders
          </p>
        </NavLink>
        <p className="bg-gray-200 h-[1px]  "></p>
        <NavLink
          to={"/additem"}
          onClick={() => setAdminDashboard("additem")}
          className={`flex justify-center sm:justify-normal gap-4 items-center  py-2 sm:pl-3 cursor-pointer ${
            adminDashboard == "additem"
              ? "bg-[#ffebf5] border border-[#c586a5] rounded"
              : ""
          }`}
        >
          <img src={assets.add_item} className="w-8" alt="" />
          <p className="hidden sm:block text-gray-500 hover:text-black">
            Add Item
          </p>
        </NavLink>
        <p className="bg-gray-200 h-[1px]  "></p>
      </div>
    </div>
  );
};

export default SideBar;
