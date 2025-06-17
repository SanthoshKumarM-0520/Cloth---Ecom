import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ListItems from "./components/ListItems";
import Orders from "./components/Orders";
import AddItem from "./components/AddItem";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("admintoken") || "");

  useEffect(() => {
    localStorage.setItem("admintoken", token);
  }, [token]);

  return (
    <>
      <ToastContainer />
      {token ? (
        <div className="px-5 ">
          <Navbar setToken={setToken} />
          <div className="flex  min-h-screen">
            {/* Left Side */}
            <SideBar />
            {/* Right Side */}
            <div className=" w-[75%] md:w-[80%] lg:w-[85%] ">
              <Routes>
                <Route
                  element={<Dashboard token={token} />}
                  path="/dashboard"
                />
                <Route
                  element={<ListItems token={token} />}
                  path="/listitems"
                />
                <Route element={<Orders token={token} />} path="/orders" />
                <Route element={<AddItem token={token} />} path="/additem" />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Login setToken={setToken} />
      )}
    </>
  );
};

export default App;
