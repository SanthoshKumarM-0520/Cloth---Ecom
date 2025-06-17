import React, { useEffect, useState } from "react";
import sampleHero from "../assets/sampleHero.png";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const ListItems = ({ token }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/v1/product/allProducts"
      );
      setProducts(response.data.products);
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong.!");
        console.log(error);
      }
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        backendUrl + "/api/v1/product/removeProducts",
        {
          data: { id },
          headers: { Authorization: token },
        }
      );

      toast.success(response.data.message);
      fetchProducts();
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong.!");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="ml-5">
      <p className="mt-7 text-gray-700">All Products List</p>
      <div className="hidden  md:grid md:grid-cols-[10%_40%_20%_10%_10%] gap-4 items-center border p-2 mt-5">
        <p className="font-bold ">Image</p>
        <p className="font-bold ">Name</p>
        <p className="font-bold ">Catogery</p>
        <p className="font-bold ">Price</p>
        <p className="font-bold ">Action</p>
      </div>
      {products.map((item) => (
        <div className="grid grid-cols-3 gap-y-2 md:gap-y-0 md:grid-cols-[10%_40%_20%_10%_10%] md:gap-4 items-center border p-2 mt-2">
          <img
            src={item.image[0]}
            className="w-15 col-span-1 md:col-span-1"
            alt=""
          />
          <p className="text-gray-500 col-span-2 md:col-span-1">{item.name}</p>
          <p className="text-gray-500 col-span-1 md:col-span-1">
            {item.category}
          </p>
          <p className="text-gray-500  col-span-1 md:col-span-1 text-center md:text-left">
            {currency}
            {item.price}
          </p>
          <p
            onClick={() => deleteProduct(item._id)}
            className="text-gray-500  col-span-1 md:col-span-1 text-center md:text-left cursor-pointer"
          >
            X
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListItems;
