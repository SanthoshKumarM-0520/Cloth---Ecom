import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "./ProductItems";

const BestSellers = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const topsellers = products.filter((item) => item.bestseller);
    setBestSellers(topsellers.slice(0, 5));
  }, [products]);

  return (
    <div className="mt-17">
      <div className="text-2xl sm:text-3xl flex justify-center">
        <Title text1={"BEST"} text2={"SELLERS"} />
      </div>
      <p className="text-center  mt-3 text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        eveniet atque dolorum corrupti quam totam.
      </p>
      <div className="grid grid-cols-2 gap-5 mt-8 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 lg:gap-7 ">
        {bestSellers.map((item) => (
          <ProductItems
            name={item.name}
            price={item.price}
            image={item.image[0]}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
