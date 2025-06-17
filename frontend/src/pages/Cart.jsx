import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    cartItems,
    currency,
    updateQuantity,
    deleteCartProduct,
    total,
    navigate,
  } = useContext(ShopContext);

  return cartItems.length > 0 ? (
    <div>
      <p className="w-full bg-black h-[1px]"></p>
      <div className="text-2xl mt-15">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div className="mt-5 ">
        {cartItems.map((item) => (
          <div className="border-t border-gray-400  flex gap-4 mb-4">
            <img src={item.img} className="w-20 mt-4" alt="" />
            <div className="flex flex-col gap-2 w-full">
              <p className="mt-3 text-xs sm:text-lg font-medium">{item.name}</p>
              <div className="b flex justify-between ">
                <div className="flex  w-[32%] sm:w-[17%] lg:w-[12%] justify-between items-center ">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p className="bg-gray-300 w-10 text-center">{item.size}</p>
                </div>
                <div className="flex justify-between items-center w-[52%]  sm:w-[75%] lg:w-[45%] ">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      e.target.value != 0 && e.target.value != ""
                        ? updateQuantity(
                            item.productId,
                            e.target.value,
                            item.size
                          )
                        : null
                    }
                    min={1}
                    className="w-20 sm:ml-[55%] lg:ml-0 border pl-3 py-1 "
                  />
                  <img
                    src={assets.bin_icon}
                    onClick={() => deleteCartProduct(item.productId, item.size)}
                    className="w-5 cursor-pointer"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-400  flex gap-4 mb-4"></div>
      <div className="flex flex-col items-end   mt-20">
        <div className=" w-full sm:w-[65%] lg:w-[42%]">
          <CartTotal />
        </div>
        <button
          onClick={() => {
            total > 0 ? navigate("/place-order") : "";
          }}
          className="bg-black text-white py-3 px-5 mt-7 cursor-pointer hover:bg-gray-700 active:bg-gray-800"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col  items-center mt-15 ">
      <p className="my-2 text-4xl">Your cart is empty !</p>
      <p className=" mt-1 mb-10 text-gray-700 text-center">
        Add Start exploring our collection and find something you love
      </p>
      <img src={assets.empty_cart} alt="" className="w-[50%] lg:w-[25%] " />

      <button
        onClick={() => {
          navigate("/collection");
        }}
        className="bg-black text-white py-3 px-5 my-8  cursor-pointer hover:bg-gray-700 active:bg-gray-800 rounded-full"
      >
        BROWSE PRODUCTS
      </button>
    </div>
  );
};

export default Cart;
