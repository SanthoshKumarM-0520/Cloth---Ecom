import { Fragment, useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const SearchBar = () => {
  const { showSearchBar, setShowSearchBar, searchFilter, setSearchFilter } =
    useContext(ShopContext);

  return showSearchBar ? (
    <Fragment>
      <div className="flex justify-center items-center gap-2 my-5 ">
        <div className="flex border border-gray-400 rounded-full items-center px-6 py-1  sm:w-3/5 lg:w-2/5 sm:ml-15 justify-between">
          <input
            type="text"
            onChange={(e) => setSearchFilter(e.target.value)}
            className="outline-none "
            placeholder="Search"
          />
          <img
            src={assets.search_icon}
            alt=""
            className="w-4 cursor-pointer transition-transform hover:scale-110 hover:opacity-80"
          />
        </div>
        <img
          src={assets.cross_icon}
          onClick={() => setShowSearchBar(false)}
          alt=""
          className="w-3 cursor-pointer"
        />
      </div>
      <hr />
    </Fragment>
  ) : null;
};

export default SearchBar;
