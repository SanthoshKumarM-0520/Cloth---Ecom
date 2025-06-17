import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import ProductItems from "./ProductItems";
import { ShopContext } from "../context/ShopContext";

const LatestCollections = () => {
  const { products } = useContext(ShopContext);
  const [latestCollections, setLatestCollections] = useState([]);

  useEffect(() => {
    setLatestCollections(products.slice(0, 10));
  }, [products]);

  return (
    <div className="mt-17">
      <div className="text-2xl sm:text-3xl flex justify-center">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
      </div>
      <p className="text-center  mt-3 text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        eveniet atque dolorum corrupti quam totam.
      </p>
      <div className="grid grid-cols-2 gap-5 mt-8 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 lg:gap-7 ">
        {latestCollections.map((item) => (
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

export default LatestCollections;
