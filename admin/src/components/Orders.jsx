import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { backendUrl, currency } from "../App";
import axios from "axios";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async (req, res) => {
    try {
      const response = await axios.get(
        backendUrl + "/api/v1/order/getAllOrders",
        { headers: { Authorization: token } }
      );

      const sortedOrders = response.data.orders.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setOrders(sortedOrders);
      console.log(sortedOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrder = async (status, orderId) => {
    try {
      const response = await axios.put(
        backendUrl + "/api/v1/order/updateOrder",
        { status, orderId },
        { headers: { Authorization: token } }
      );
      fetchAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return orders ? (
    <div className="mt-7 ml-5">
      <p className=" text-gray-700">All Orders</p>
      {/* To Loop */}
      {orders.map((i) => (
        <div className="border border-gray-400 grid sm:grid-cols-5 p-3 items-center gap-y-6 mt-2">
          {/* 1 */}
          <div className="sm:col-span-1 lg:col-span-1 flex justify-center items-center">
            <img src={assets.parcel_icon} alt="" className="w-17" />
          </div>

          {/* 2 */}
          <div className="sm:col-span-2 lg:col-span-1 text-sm  text-gray-600 ">
            <div className="flex flex-col gap-1">
              {i.orderItem.map((items) => (
                <p className="text-black">
                  -{items.name}{" "}
                  <span className="font-bold text-gray-400">X</span>{" "}
                  {items.quantity}
                  {items.size}
                </p>
              ))}
            </div>

            <p className="mt-5 font-bold">{i.customerName}</p>
            <p className=" w-full ">
              {`${i.street}, ${i.city}, ${i.state}, ${i.zipcode}, ${i.country}`}
            </p>
            <p className="">{i.phone}</p>
          </div>
          {/* 3 */}
          <div className="sm:col-span-2 lg:col-span-1 text-sm  text-gray-600 ">
            <div className="flex flex-col sm:ml-15">
              <p>Items: {i.orderItem.length}</p>
              <p>
                Method:{" "}
                {i.payment == "cod" ? i.payment.toUpperCase() : i.payment}
              </p>
              <p>Payment: {i.payment == "cod" ? "Pending" : "Paid"}</p>
              <p>
                Date:{" "}
                {new Date(i.date)
                  .toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "Asia/Kolkata",
                  })
                  .replace(",", "-")}
              </p>
            </div>
          </div>
          {/* 4 */}
          <div className="sm:col-span-1 lg:col-span-1 ">
            <p className=" font-bold text-gray-600 lg:ml-15">
              {currency + " "}
              {i.total}
            </p>
          </div>
          {/* 5 */}
          <div className="sm:col-span-1 lg:col-span-1 ">
            <select
              name=""
              id=""
              className="border  px-4 py-2 "
              onChange={(e) => updateOrder(e.target.value, i._id)}
              defaultValue={i.orderStatus}
            >
              <option value="Order Placed">🟢 Order Placed</option>
              <option value="Order Packed">📦 Order Packed</option>
              <option value="Order Shipped">🚚 Order Shipped</option>
              <option value="Order Delivered">✅ Order Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default Orders;
