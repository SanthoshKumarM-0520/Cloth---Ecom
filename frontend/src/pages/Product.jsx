import React, { Fragment, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";
import { toast } from "react-toastify";

const Product = () => {
  const { products, currency, addToCart, token, navigate } =
    useContext(ShopContext);
  const { productId } = useParams("/:productId");
  const [productDetail, setProductDetail] = useState("");
  const [bigImage, setBigImage] = useState("");
  const [size, setSize] = useState("");
  const [visible, setVisible] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchProductDetail = () => {
    const product = products.filter((item) => {
      if (item._id === productId) {
        setProductDetail(item);
        setBigImage(item.image[0]);
        return;
      }
    });
  };

  const relatedProduct = () => {
    const { category, subCategory, _id } = productDetail;
    let productCopy = products.slice();

    productCopy = productCopy.filter(
      (item) => item.category === category && item._id != _id
    );
    productCopy = productCopy.filter(
      (item) => item.subCategory === subCategory
    );
    productCopy = productCopy.slice(0, 5);
    setRelatedProducts(productCopy);
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productId, products]);

  useEffect(() => {
    if (productDetail) {
      setVisible(true);
    }
    relatedProduct();
  }, [productDetail, products]);

  const onClickHandler = (size, productDetail) => {
    if (!token) {
      navigate("/login");
      toast.warn("Please log in to continue.");
    } else {
      addToCart(size, productDetail);
    }
  };

  return productDetail && relatedProducts ? (
    <div
      className={`transition-opacity duration-500 ease-in ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <p className="w-full bg-black h-[1px]"></p>

      <div className="flex flex-col sm:flex-row mt-10 gap-3 ">
        {/* Mulitiple Images */}

        <div className="flex sm:flex-col order-2 sm:order-1  gap-3 w-[23%] sm:w-[9%] h-full">
          {productDetail.image.map((i) => (
            <img
              src={i}
              alt=""
              className="cursor-pointer"
              onClick={() => setBigImage(i)}
            />
          ))}
        </div>
        {/* Single Images */}
        <div className="  sm:w-[40%]  order-1 sm:order-2">
          <img src={bigImage} alt="" className=" w-full h-auto" />
        </div>

        {/* Product Details */}
        <div className=" order-3 sm:w-[50%] sm:ml-10">
          <p>{productDetail.name}</p>
          <div className="flex mt-2 gap-3">
            <div className="flex items-center gap-1">
              <img src={assets.star_icon} className="w-3" alt="" />
              <img src={assets.star_icon} className="w-3" alt="" />
              <img src={assets.star_icon} className="w-3" alt="" />
              <img src={assets.star_icon} className="w-3" alt="" />
              <img src={assets.star_dull_icon} className="w-3" alt="" />
            </div>
            <p>(122)</p>
          </div>
          <p className="font-medium text-3xl mt-5">
            {currency}
            {productDetail.price}
          </p>
          <p className="mt-5 text-gray-500 ">{productDetail.description}</p>
          <p className="text-black mt-7 font-medium">Select Size</p>
          <div className="flex gap-2 mt-5">
            {productDetail.sizes.map((s) => (
              <div
                className={`bg-gray-100 px-4 py-2 cursor-pointer ${
                  size === s ? "border border-black " : ""
                }`}
                onClick={() => setSize(s)}
              >
                {s}
              </div>
            ))}
          </div>
          <button
            onClick={() => onClickHandler(size, productDetail)}
            className="bg-black text-white mt-8 px-7 py-3 text-sm hover:bg-gray-700 cursor-pointer"
          >
            ADD TO CART
          </button>
          <hr className="mt-10" />
          <div className="text-gray-500 mt-3 text-sm">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this Product</p>
            <p>Easy return and Exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      <div className="flex mt-15">
        <p className="border border-black border-r-0  px-5 py-3 font-medium">
          Description
        </p>
        <p className="border border-black border-b-0 px-5 py-3 text-gray-800">
          Reviews(122)
        </p>
      </div>
      <div className="border border-gray-500 p-5 text-gray-600 text-sm">
        <p>
          This dress blends timeless style with modern comfort, making it the
          perfect choice for casual outings, office wear, or weekend brunches.
          Designed with a flattering silhouette and premium fabric, it hugs your
          curves gently while allowing full freedom of movement.
        </p>
        <p className="mt-3">
          Whether paired with heels for a polished look or sneakers for a
          laid-back vibe, this dress adapts effortlessly to your lifestyle. With
          breathable, lightweight material and durable stitching, it’s a
          wardrobe essential you’ll reach for again and again.
        </p>
      </div>
      <div className="mt-15">
        <div className="text-3xl">
          <div className="flex justify-center">
            <Title text1={"RELATED"} text2={"PRODUCTS"} />
          </div>

          <div className="grid grid-cols-2 gap-5 mt-8 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 lg:gap-7 ">
            {relatedProducts.map((item) => (
              <ProductItems
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image[0]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
