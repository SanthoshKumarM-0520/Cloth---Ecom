import React from "react";
import { useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const { clearCart } = useContext(ShopContext);

  useEffect(() => {
    toast.success("Payment Successful! 🎉");
    clearCart(); // Optional: clear cart
  }, []);

  return (
    <div className="flex justify-center items-center h-screen text-2xl">
      Thank you for your order! Payment received.
    </div>
  );
};

export default PaymentSuccess;
