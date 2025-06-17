import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const AddItem = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const resetForm = () => {
    setImage1(false);
    setImage2(false);
    setImage3(false);
    setImage4(false);
    setName("");
    setDescription("");
    setCategory("Men");
    setSubCategory("Topwear");
    setPrice("");
    setSizes([]);
    setBestseller(false);
  };

  const onSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = new FormData();
      newProduct.append("name", name);
      newProduct.append("description", description);
      newProduct.append("price", price);
      newProduct.append("category", category);
      newProduct.append("subCategory", subCategory);
      newProduct.append("sizes", JSON.stringify(sizes));
      newProduct.append("bestseller", bestseller);
      image1 ? newProduct.append("image", image1) : "";
      image2 ? newProduct.append("image", image2) : "";
      image3 ? newProduct.append("image", image3) : "";
      image4 ? newProduct.append("image", image4) : "";

      const response = await axios.post(
        backendUrl + "/api/v1/product/addProducts",
        newProduct,
        { headers: { Authorization: token } }
      );

      toast.success("Product added Successfully");
      resetForm();
    } catch (error) {
      console.log(error);

      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong.!");
        console.log(error);
      }
    }
  };

  return (
    <form
      action=""
      className="mt-7 ml-5 md:ml-20 sm:w-[450px]"
      onSubmit={onSubmitProduct}
    >
      <p className="text-gray-700">Upload Image</p>
      <div className="flex gap-2 mt-3">
        <label htmlFor="image1" className="cursor-pointer">
          <img
            src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
            className="w-20"
            alt=""
          />
          <input
            type="file"
            id="image1"
            className="hidden"
            onChange={(e) => setImage1(e.target.files[0])}
          />
        </label>
        <label htmlFor="image2" className="cursor-pointer">
          <img
            src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
            className="w-20"
            alt=""
          />
          <input
            type="file"
            id="image2"
            className="hidden"
            onChange={(e) => setImage2(e.target.files[0])}
          />
        </label>
        <label htmlFor="image3" className="cursor-pointer">
          <img
            src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
            className="w-20"
            alt=""
          />
          <input
            type="file"
            id="image3"
            className="hidden"
            onChange={(e) => setImage3(e.target.files[0])}
          />
        </label>
        <label htmlFor="image4" className="cursor-pointer">
          <img
            src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
            className="w-20"
            alt=""
          />
          <input
            type="file"
            id="image4"
            className="hidden"
            onChange={(e) => setImage4(e.target.files[0])}
          />
        </label>
      </div>
      <p className="text-gray-700 mt-4">Product name</p>
      <input
        value={name}
        type="text"
        className="border border-gray-300 rounded pl-5 py-2 w-full mt-3 outline-[#c586a5]"
        placeholder="Type here..."
        required
        onChange={(e) => setName(e.target.value)}
      />
      <p className="text-gray-700 mt-4">Product description</p>
      <textarea
        value={description}
        type="text"
        className="border border-gray-300 rounded pl-5 py-2 w-full mt-3 outline-[#c586a5]"
        placeholder="Write content here"
        required
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex flex-col sm:flex-row justify-between sm:items-end">
        <div>
          <p className="text-gray-700 mt-4">Product category</p>
          <select
            value={category}
            className="border w-full border-gray-300 pl-2 pr-4 py-2 mt-3 text-gray-600"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="text-gray-700 mt-4">Sub category</p>
          <select
            value={subCategory}
            className="border w-full border-gray-300 px-2 py-2 mt-3 text-gray-600"
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="text-gray-700 mt-4">Product Price</p>
          <input
            value={price}
            type="number"
            className="border w-full border-gray-300 sm:w-[100px] h-[40px] mt-3 px-2 py-2 outline-[#c586a5]"
            placeholder="150"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <p className="text-gray-700 mt-4">Product sizes</p>
      <div className="flex gap-2 mt-3 justify-between sm:justify-start">
        <p
          onClick={(e) =>
            setSizes((prev) =>
              prev.includes("S")
                ? prev.filter((item) => item !== "S")
                : [...prev, "S"]
            )
          }
          className={`${
            sizes.includes("S") ? "bg-pink-100" : "bg-gray-200"
          } px-3 py-1 cursor-pointer`}
        >
          S
        </p>
        <p
          onClick={(e) =>
            setSizes((prev) =>
              prev.includes("M")
                ? prev.filter((item) => item !== "M")
                : [...prev, "M"]
            )
          }
          className={`${
            sizes.includes("M") ? "bg-pink-100" : "bg-gray-200"
          } px-3 py-1 cursor-pointer`}
        >
          M
        </p>
        <p
          onClick={(e) =>
            setSizes((prev) =>
              prev.includes("L")
                ? prev.filter((item) => item !== "L")
                : [...prev, "L"]
            )
          }
          className={`${
            sizes.includes("L") ? "bg-pink-100" : "bg-gray-200"
          } px-3 py-1 cursor-pointer`}
        >
          L
        </p>
        <p
          onClick={(e) =>
            setSizes((prev) =>
              prev.includes("XL")
                ? prev.filter((item) => item !== "XL")
                : [...prev, "XL"]
            )
          }
          className={`${
            sizes.includes("XL") ? "bg-pink-100" : "bg-gray-200"
          } px-3 py-1 cursor-pointer`}
        >
          XL
        </p>
        <p
          onClick={(e) =>
            setSizes((prev) =>
              prev.includes("XXL")
                ? prev.filter((item) => item !== "XXL")
                : [...prev, "XXL"]
            )
          }
          className={`${
            sizes.includes("XXL") ? "bg-pink-100" : "bg-gray-200"
          } px-3 py-1 cursor-pointer`}
        >
          XXL
        </p>
      </div>
      <div className="flex mt-4 gap-2">
        <input
          type="checkbox"
          onChange={() => setBestseller(!bestseller)}
          checked={bestseller}
        />
        <p className="text-gray-700 ">Add to bestseller</p>
      </div>
      <button
        onClick={onSubmitProduct}
        className="bg-black text-white px-10 py-2 mt-6 cursor-pointer active:bg-gray-600"
      >
        ADD
      </button>
    </form>
  );
};

export default AddItem;
