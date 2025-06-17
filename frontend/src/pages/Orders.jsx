import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { backendUrl } from "../App";
import { jsx } from "react/jsx-runtime";
import { useState } from "react";

const Orders = () => {
  const { products, currency, token } = useContext(ShopContext);
  const [orderItems, setOrderItems] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/v1/order/userOrders",
        { headers: { Authorization: token } }
      );

      const userordertData = response.data.userOrders;

      const userOrderItems = [];

      for (let i = 0; i < userordertData.length; i++) {
        let orderStatus = userordertData[i].orderStatus;
        let orderItems = userordertData[i].orderItem;
        let orderDate = userordertData[i].date;

        for (let j = 0; j < orderItems.length; j++) {
          let indiviProduct = orderItems[j];
          indiviProduct = {
            ...indiviProduct,
            status: orderStatus,
            date: orderDate,
          };
          userOrderItems.push(indiviProduct);
        }
      }

      setOrderItems(userOrderItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserOrders();
    }
  }, [token]);

  return (
    <div>
      <p className="w-full bg-black h-[1px]"></p>
      {orderItems.map((item) => (
        <div>
          <div className="flex flex-col lg:flex-row mt-5">
            {/* Left Pic & Product Details */}
            <div className="flex gap-5  lg:w-[45%]">
              <img src={item.img} className="w-20" alt="" />
              <div>
                <div className="sm:text-base font-medium">
                  <p>{item.name}</p>
                </div>
                <div className="flex gap-4 mt-3 text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: M</p>
                </div>
                <div className="mt-1 text-sm">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>{" "}
                </div>
              </div>
            </div>
            {/* Ready to ship & Track Order */}
            <div className="mt-1 flex justify-between items-center  lg:w-[55%]">
              <div className="flex items-center gap-2">
                <p
                  className={`w-2 h-2 rounded-full ${
                    item.status === "Order Placed"
                      ? "bg-green-300"
                      : item.status === "Order Packed"
                      ? "bg-orange-400"
                      : item.status === "Order Shipped"
                      ? "bg-blue-500"
                      : item.status === "Order Delivered"
                      ? "bg-emerald-500"
                      : "bg-gray-400"
                  }`}
                ></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                onClick={fetchUserOrders}
                className="text-gray-600 border border-gray-600 px-2 py-2 rounded cursor-pointer hover:bg-gray-500 hover:text-white"
              >
                Track Order
              </button>
            </div>
          </div>
          <p className="w-full bg-gray-300 h-[1px] mt-5"></p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
