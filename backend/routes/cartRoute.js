import express from "express"
import { addToCart, userCartDetail, updateCart, deleteCartProduct, clearCart } from "../controller/cartController.js"
import userAuth from "../middleware/userAuth.js"


const cartRouter = express.Router()


cartRouter.post("/addCart", userAuth, addToCart)
cartRouter.get("/userCart", userAuth, userCartDetail)
cartRouter.put("/updateCart", userAuth, updateCart)
cartRouter.post("/deleteCart", userAuth, deleteCartProduct)
cartRouter.delete("/clearCart", userAuth, clearCart)




export default cartRouter