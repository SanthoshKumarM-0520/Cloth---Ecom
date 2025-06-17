import React, { useEffect, useState } from "react";
import { IoCart, IoPeople, IoTimer } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import axios from "axios";
import { backendUrl, currency } from "../App";

const Dashboard = ({ token }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [pendingDelivery, setPendingDelivery] = useState(0);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/v1/order/getAllOrders",
        { headers: { Authorization: token } }
      );

      const order = response.data.orders;

      let total = 0;
      let pendingOrder = 0;

      order.forEach((order) => {
        total += order.total;
        if (order.orderStatus === "Order Placed") {
          pendingOrder += 1;
        }
      });

      setTotalRevenue(total);
      setTotalOrder(order.length);
      setPendingDelivery(pendingOrder);

      const usersResponse = await axios.get(
        backendUrl + "/api/v1/user/getAllUser",
        { headers: { Authorization: token } }
      );

      setTotalCustomer(usersResponse.data.users.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <MdAttachMoney className="text-2xl text-green-600" />
          </div>
          <p className="text-3xl font-semibold text-gray-800">
            {currency}
            {totalRevenue}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Total Orders</p>
            <IoCart className="text-2xl text-blue-600" />
          </div>
          <p className="text-3xl font-semibold text-gray-800">{totalOrder}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Total Customers</p>
            <IoPeople className="text-2xl text-purple-600" />
          </div>
          <p className="text-3xl font-semibold text-gray-800">
            {totalCustomer}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Pending Deliveries</p>
            <IoTimer className="text-2xl text-orange-500" />
          </div>
          <p className="text-3xl font-semibold text-gray-800">
            {pendingDelivery}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
