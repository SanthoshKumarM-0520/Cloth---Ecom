import React, { useContext } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, subTotal, shippingFee, total } = useContext(ShopContext);

  return (
    <div>
      <div className="  text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex justify-between mt-4 mb-2 text-sm">
        <p>Subtotal</p>
        <p>
          {currency}
          {subTotal}.00
        </p>
      </div>
      <hr />
      <div className="flex justify-between my-2 text-sm">
        <p>Shipping Fee</p>
        <p>{shippingFee}</p>
      </div>
      <hr />
      <div className="flex justify-between mt-2">
        <b className="text-sm">Total</b>
        <b>
          {currency}
          {total}.00
        </b>
      </div>
    </div>
  );
};

export default CartTotal;
