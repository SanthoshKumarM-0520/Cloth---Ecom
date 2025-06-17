import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, Navigate } from "react-router-dom";

const ProductItems = ({ name, price, image, id }) => {
  const { products, currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`}>
      <div className="overflow-hidden ">
        <img
          src={image}
          className="cursor-pointer  hover:scale-110 transition ease-in-out "
          alt=""
        />
      </div>
      <p className="text-sm text-gray-700 mt-5">{name}</p>
      <p className="text-sm font-medium text-gray-800 mt-1">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItems;
