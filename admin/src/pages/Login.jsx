import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/user/loginAdmin",
        {
          email,
          password,
        }
      );
      toast.success("Login Success");
      setToken(response.data.token);
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong.!");
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center min-h-screen items-center">
      <form
        onSubmit={(e) => onsubmitHandler(e)}
        className="flex flex-col w-[350px] h-[50%] bg-white p-5 rounded-lg shadow-lg"
      >
        <b className="text-2xl text-center">Admin Panel</b>
        <p className="mt-5 text-gray-600">Email Address</p>
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          className="border bg-blue-50 rounded px-4 py-2 border-gray-400 mt-1"
        />
        <p className="mt-3 text-gray-600">Password</p>
        <input
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="border bg-blue-50 rounded px-4 py-2 border-gray-400 mt-1"
        />
        <button className="bg-black text-white mt-5 rounded  py-2 cursor-pointer active:scale-95 transition-transform duration-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
