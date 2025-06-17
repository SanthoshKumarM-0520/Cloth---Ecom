import { Fragment, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";
import SearchBar from "../components/SearchBar";

const Collections = () => {
  const [filetrs, setFiletrs] = useState(false);
  const { products, searchFilter, showSearchBar } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState([]);
  const [sortType, setSortType] = useState("related");

  const handleCategories = (e) => {
    if (categories.includes(e.target.value)) {
      setCategories((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategories((prev) => [...prev, e.target.value]);
    }
  };

  const handleTypes = (e) => {
    if (type.includes(e.target.value)) {
      setType((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setType((prev) => [...prev, e.target.value]);
    }
  };

  const handleFilters = () => {
    let productsCopy = products.slice();

    if (searchFilter && showSearchBar) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    if (categories.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        categories.includes(item.category)
      );
    }
    if (type.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        type.includes(item.subCategory)
      );
    }

    // Sort after filtering
    if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    } else if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    handleFilters();
  }, [categories, type, sortType, searchFilter, showSearchBar, products]);

  return (
    products && (
      <Fragment>
        <p className="w-full bg-black h-[1px]"></p>
        <SearchBar />
        <div className="w-full sm:flex sm:gap-3 mt-10 md:gap-10 lg:gap-15">
          {/* Left Side Filters - Categories & Type */}
          <div className=" sm:w-2/5 lg:w-1/5 ">
            <div
              onClick={() => setFiletrs(!filetrs)}
              className="flex items-center w-full gap-3 cursor-pointer"
            >
              <p className="text-xl">FILTERS</p>
              <img
                src={assets.dropdown_icon}
                className={`h-3 sm:hidden ${filetrs ? "rotate-90" : ""} `}
                alt=""
              />
            </div>
            <div className={` ${filetrs ? "" : "hidden"} sm:block`}>
              <div className="border border-gray-500 sm:border-gray-300 mt-5 p-4">
                <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                <div className="flex flex-col text-sm font-light text-gray-700 gap-2">
                  <p className="flex gap-1">
                    <input
                      type="checkbox"
                      value={"Men"}
                      onChange={handleCategories}
                    />
                    Men
                  </p>
                  <p className="flex gap-1">
                    <input
                      type="checkbox"
                      value={"Women"}
                      onChange={handleCategories}
                    />
                    Women
                  </p>
                  <p className="flex gap-1">
                    <input
                      type="checkbox"
                      value={"Kids"}
                      onChange={handleCategories}
                    />
                    Kids
                  </p>
                </div>
              </div>
              <div className="border border-gray-500 sm:border-gray-300 mt-5 p-5">
                <p className="mb-3 text-sm font-medium">TYPE</p>
                <div className="flex flex-col text-sm font-light text-gray-700 gap-2">
                  <p className="flex gap-1">
                    <input
                      type="checkbox"
                      value={"Topwear"}
                      onChange={handleTypes}
                    />
                    Topwear Men
                  </p>
                  <p className="flex gap-1">
                    <input
                      type="checkbox"
                      value={"Bottomwear"}
                      onChange={handleTypes}
                    />
                    Bottomwear Women
                  </p>
                  <p className="flex gap-1">
                    <input
                      type="checkbox"
                      value={"Winterwear"}
                      onChange={handleTypes}
                    />
                    Winterwear Kids
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* All Products */}
          <div className=" w-full mt-5 sm:mt-0">
            <div className="flex justify-between items-start md:gap-6">
              <div className="sm:text-2xl">
                <Title text1={"ALL"} text2={"COLLECTIONS"} />
              </div>

              <div>
                <select
                  className="border sm:py-3 lg:p-3 bg-gray-100"
                  onChange={(e) => setSortType(e.target.value)}
                >
                  <option value="relavent">Sort by: Relavent</option>
                  <option value="high-low">Sort by: High to Low</option>
                  <option value="low-high">Sort by: Low to High</option>
                </select>
              </div>
            </div>
            <h1
              className={`${
                searchFilter && showSearchBar && filterProducts.length > 0
                  ? ""
                  : "hidden"
              }`}
            >
              {filterProducts.length} Results for "{searchFilter}"
            </h1>
            {filterProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-5 mt-5">
                {filterProducts.map((item) => (
                  <ProductItems
                    name={item.name}
                    price={item.price}
                    id={item._id}
                    image={item.image[0]}
                  />
                ))}
              </div>
            ) : (
              <h1
                className={`${
                  searchFilter && showSearchBar ? "" : "hidden"
                } text-red-400 `}
              >
                No Such Product
              </h1>
            )}
          </div>
        </div>
      </Fragment>
    )
  );
};

export default Collections;
