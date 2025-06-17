import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearchBar,
    totalCartProduct,
    setToken,
    navigate,
    token,
    user,
  } = useContext(ShopContext);
  const location = useLocation();
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const [userFirstLetter, setUserFirstLetter] = useState("");

  useEffect(() => {
    if (token && user.name) {
      setUserFirstLetter(user.name[0].toUpperCase());
    }
  }, [token, user.name]);

  useEffect(() => {
    if (location.pathname === "/collection") {
      setShowSearchIcon(true);
    } else {
      setShowSearchIcon(false);
    }
  }, [location.pathname]);

  const logoutHandler = () => {
    setToken("");
    localStorage.setItem("usertoken", "");
    navigate("/login");
  };

  return (
    <div className="flex justify-between py-5 items-center font-medium ">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>

      <ul className=" hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="hidden w-2/4 h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="hidden w-2/4 h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="hidden w-2/4 h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="hidden w-2/4 h-[1.5px] bg-gray-700" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6 ">
        <img
          src={assets.search_icon}
          onClick={() => setShowSearchBar(true)}
          className={`${showSearchIcon ? "" : "hidden"} w-5 cursor-pointer`}
          alt="search_icon "
        />
        <div className="group relative ">
          {token ? (
            <p className=" font-bold w-5 h-5 flex justify-center items-center border text-center rounded-full p-3 cursor-pointer ">
              {userFirstLetter}
            </p>
          ) : (
            <Link to={"/login"}>
              <img src={assets.login} className="w-6 cursor-pointer" alt="" />
            </Link>
          )}

          <div className="hidden group-hover:block absolute dropdown-menu right-0 pt-4 ">
            <div
              className={` flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded ${
                token ? "" : "hidden"
              }`}
            >
              <Link to={"/profile"}>
                <p className=" hover:text-black cursor-pointer">My Profile</p>
              </Link>
              <Link to={"/orders"}>
                <p className=" hover:text-black cursor-pointer">Orders</p>
              </Link>
              <p
                onClick={logoutHandler}
                className=" hover:text-black cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {totalCartProduct()}
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          onClick={() => setVisible(true)}
          className="w-5 sm:hidden cursor-pointer"
          alt=""
        />
      </div>
      {/* Sidebar for Small Screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden transition-all bg-white ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex cursor-pointer items-center  p-3"
            onClick={() => setVisible(false)}
          >
            <img src={assets.dropdown_icon} className="rotate-180 w-2" alt="" />
            <p className="px-5 text-gray-800">Back</p>
          </div>
          <hr />
          <NavLink to="/" onClick={() => setVisible(false)}>
            <p className="py-2 pl-6 text-center">HOME</p>
          </NavLink>
          <hr />
          <NavLink to="/collection" onClick={() => setVisible(false)}>
            <p className="py-2 pl-6 text-center">COLLECTION</p>
          </NavLink>
          <hr />
          <NavLink to="/about" onClick={() => setVisible(false)}>
            <p className="py-2 pl-6 text-center">ABOUT</p>
          </NavLink>
          <hr />
          <NavLink to="/contact" onClick={() => setVisible(false)}>
            <p className="py-2 pl-6 text-center">CONTACT</p>
          </NavLink>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
