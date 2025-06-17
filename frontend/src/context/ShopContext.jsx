import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 70;
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(delivery_fee);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [totalCartItems, setTotalCartItems] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});

  //Authentication - Token - User
  const checkForToken = () => {
    if (localStorage.getItem("usertoken")) {
      setToken(localStorage.getItem("usertoken"));
    }
  };

  //Get Products details
  const getProductsData = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/v1/product/allProducts"
      );

      if (response.data) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //Get User Cart Details
  const cartDetails = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/v1/cart/userCart", {
        headers: { token },
      });
      setCartItems(response.data.cartDetails);
    } catch (error) {
      console.log(error);
    }
  };

  //Total cart Products
  const totalCartProduct = () => {
    let quantity = 0;
    for (let i in cartItems) {
      quantity += cartItems[i]["quantity"];
    }

    return quantity;
  };

  //Add Product to Cart
  const addToCart = async (size, product) => {
    if (!size) {
      toast.info("Please Select the Size");
    } else {
      try {
        const response = await axios.post(
          backendUrl + "/api/v1/cart/addCart",
          { size, product },
          { headers: { Authorization: token } }
        );
        setCartItems(response.data.cartDetails);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUser = async (req, res) => {
    try {
      const response = await axios.get(
        backendUrl + "/api/v1/user/userDetails",
        { headers: { Authorization: token } }
      );
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  //------------------------------------->
  useEffect(() => {
    checkForToken();
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) {
      getUser();
      cartDetails();
    } else {
      setCartItems({});
    }
  }, [token]);

  const shippingValue = () => {
    let copyCartProducts = structuredClone(cartItems);

    // Subtotal
    let subtotalcalc = 0;
    for (let i = 0; i < copyCartProducts.length; i++) {
      let temp = copyCartProducts[i];
      subtotalcalc += temp["quantity"] * temp["price"];
    }
    setSubTotal(subtotalcalc);

    //Shipping Fee
    let shippingFeeCalc = null;
    if (subtotalcalc > 499) {
      shippingFeeCalc = "Free";
    } else if (subtotalcalc == 0) {
      shippingFeeCalc = `${currency}0`;
    } else {
      shippingFeeCalc = `${delivery_fee}`;
    }
    setShippingFee(shippingFeeCalc);

    //Total
    let totalCalc = 0;
    if (shippingFeeCalc == `${currency}0` || shippingFeeCalc == "Free") {
      totalCalc = subtotalcalc;
    } else {
      totalCalc = subtotalcalc + delivery_fee;
    }

    setTotal(totalCalc);
  };

  useEffect(() => {
    totalCartProduct();
    shippingValue();
  }, [cartItems]);

  const updateQuantity = async (product, qty, size) => {
    try {
      const response = await axios.put(
        backendUrl + "/api/v1/cart/updateCart",
        { product, qty, size },
        { headers: { Authorization: token } }
      );

      setCartItems(response.data.cartData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartProduct = async (product, size) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/cart/deleteCart",
        { product, size },
        { headers: { Authorization: token } }
      );
      setCartItems(response.data.cartData);
    } catch (error) {
      console.log(error);
    }
  };

  //------------------------------------->

  const value = {
    products,
    currency,
    delivery_fee,
    showSearchBar,
    setShowSearchBar,
    searchFilter,
    setSearchFilter,
    addToCart,
    totalCartItems,
    cartItems,
    updateQuantity,
    deleteCartProduct,
    subTotal,
    shippingFee,
    total,
    navigate,
    token,
    setToken,
    //-------------------
    totalCartProduct,
    setCartItems,
    user,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
