import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user, setToken, navigate } = useContext(ShopContext);

  const logoutHandler = () => {
    setToken("");
    localStorage.setItem("usertoken", "");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center">
        <img
          src={assets.userProfil}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
        <p className="text-gray-600 mb-6">{user.email}</p>

        <div className="flex flex-col gap-3">
          <Link to={"/orders"}>
            <button className="w-full py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition cursor-pointer">
              My Orders
            </button>
          </Link>
          <button
            onClick={logoutHandler}
            className="w-full py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
