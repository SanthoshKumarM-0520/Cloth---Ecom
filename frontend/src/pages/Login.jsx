import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const [form, setForm] = useState("Log in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigate, token, setToken } = useContext(ShopContext);

  const onClickHandler = async () => {
    try {
      let response;
      if (form === "Sign up") {
        response = await axios.post(backendUrl + "/api/v1/user/registerUser", {
          email,
          name,
          password,
        });
      } else {
        response = await axios.post(backendUrl + "/api/v1/user/loginUser", {
          email,
          password,
        });
      }

      toast.success(response.data.message);
      localStorage.setItem("usertoken", response.data.token);
      setToken(localStorage.getItem("usertoken"));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center mt-25  gap-3 ">
      <div className="">
        <div className="flex items-center gap-2  ">
          <p className="prata-regular text-3xl">{form}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
      </div>
      <div className="flex flex-col  mt-4 w-[90%] sm:w-95">
        {form == "Sign up" ? (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            className="border pl-3 py-2 w-full"
          />
        ) : (
          ""
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          className="border pl-3 py-2 w-full mt-3"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="border pl-3 py-2 w-full mt-3"
        />
        <div className="flex justify-between text-sm text-gray-700 mt-2">
          <p className="cursor-pointer hover:text-black">
            Forget your Password?
          </p>
          {form == "Log in" ? (
            <p
              onClick={() => setForm("Sign up")}
              className="cursor-pointer hover:text-black"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => setForm("Log in")}
              className="cursor-pointer hover:text-black"
            >
              Login Here
            </p>
          )}
        </div>
        <div className="flex justify-center mt-7">
          <button
            onClick={onClickHandler}
            className="bg-black text-white px-8 py-2 cursor-pointer hover:bg-gray-700 active:bg-gray-800"
          >
            {form == "Sign up" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
