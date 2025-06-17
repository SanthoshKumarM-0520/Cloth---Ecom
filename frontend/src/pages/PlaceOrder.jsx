import React, { Fragment, useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [firstName, setFirstName] = useState("");
  const [lasttName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const { cartItems, total, token, setCartItems, navigate } =
    useContext(ShopContext);

  const clearCart = async () => {
    try {
      const response = await axios.delete(
        backendUrl + "/api/v1/cart/clearCart",
        { headers: { Authorization: token } }
      );
      setCartItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        backendUrl + "/api/v1/order/postNewOrder",
        {
          customerName: firstName + " " + lasttName,
          email,
          street,
          city,
          state,
          zipcode,
          country,
          phone,
          orderItem: cartItems,
          payment: method,
          total,
        },
        { headers: { Authorization: token } }
      );

      toast.success("Order Placed Successfully");
      clearCart();
    } catch (error) {
      console.log(error);
    }
    navigate("/orders");
  };

  return (
    <Fragment>
      <p className="w-full bg-black h-[1px]"></p>
      <div className="flex flex-col sm:flex-row gap-7 mt-15 justify-between">
        <form className="sm:w-[50%] lg:w-[47%]" onSubmit={onSubmitHandler}>
          <div className="text-2xl">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          <div className="mt-5">
            <div className="flex gap-2">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                required
                className=" border border-gray-400 px-3 py-2 w-[50%] rounded"
                placeholder="First name"
              />
              <input
                value={lasttName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                required
                className=" border border-gray-400 px-3 py-2 w-[50%] rounded"
                placeholder="Last name"
              />
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className=" border w-full border-gray-400 px-3 py-2  rounded mt-3"
              placeholder="Email address"
            />
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              type="text"
              required
              className=" border w-full border-gray-400 px-3 py-2  rounded mt-3"
              placeholder="Street"
            />
            <div className="flex gap-2 mt-3">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                required
                className=" border border-gray-400 px-3 py-2 w-[50%] rounded"
                placeholder="City"
              />
              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                type="text"
                required
                className=" border border-gray-400 px-3 py-2 w-[50%] rounded"
                placeholder="State"
              />
            </div>
            <div className="flex gap-2 mt-3">
              <input
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                type="text"
                required
                className=" border border-gray-400 px-3 py-2 w-[50%] rounded"
                placeholder="Zipcode"
              />
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                required
                className=" border border-gray-400 px-3 py-2 w-[50%] rounded"
                placeholder="Country"
              />
            </div>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              required
              className=" border w-full border-gray-400 px-3 py-2  rounded mt-3"
              placeholder="Phone"
            />
          </div>
        </form>
        <div className="sm:w-[50%] lg:w-[53%] ">
          <CartTotal />
          <div className="mt-10">
            <div className="  text-1xl">
              <Title text1={"PAYMENT"} text2={"METHOD"} />
            </div>
            <div className="flex flex-col lg:flex-row mt-5 items-center gap-3 ">
              <div className="flex flex-col lg:flex-row w-full  lg:w-[31%]">
                <div
                  onClick={() => setMethod("razorpay")}
                  className="flex border w-full  items-center px-3 py-2 sm:gap-6 gap-5 lg:gap-3 cursor-pointer"
                >
                  <p
                    className={`min-w-3.5 h-3.5 rounded-full border ${
                      method == "razorpay" ? "bg-green-500" : ""
                    }`}
                  ></p>
                  <img src={assets.razorpay_logo} className="h-5" alt="" />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row w-full  lg:w-[21%]">
                <div
                  onClick={() => setMethod("stripe")}
                  className="flex border w-full  items-center px-3 py-2 sm:gap-6 gap-5 lg:gap-3 cursor-pointer"
                >
                  <p
                    className={`min-w-3.5 h-3.5 rounded-full border ${
                      method == "stripe" ? "bg-green-500" : ""
                    }`}
                  ></p>
                  <img src={assets.stripe_logo} className="h-5" alt="" />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row w-full  lg:w-[43%]">
                <div
                  onClick={() => setMethod("cod")}
                  className="flex border w-full  items-center px-3 py-2 sm:gap-6 gap-5 lg:gap-3 cursor-pointer"
                >
                  <p
                    className={`min-w-3.5 h-3.5 rounded-full border ${
                      method == "cod" ? "bg-green-500" : ""
                    }`}
                  ></p>
                  <p className="h-5 text-gray-600 text-sm">CASH ON DELIVERY</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onSubmitHandler}
              className="bg-black text-white py-3 px-5 my-8  cursor-pointer hover:bg-gray-700 active:bg-gray-800 "
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PlaceOrder;
