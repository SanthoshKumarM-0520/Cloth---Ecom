import express from "express"
import userAuth from "../middleware/userAuth.js"
import { postNewOrder, userOrders, getAllOrders, updateOrder } from "../controller/orderController.js"



const orderRoute = express.Router()



orderRoute.post('/postNewOrder', userAuth, postNewOrder)
orderRoute.get('/userOrders', userAuth, userOrders)
orderRoute.get("/getAllOrders", userAuth, getAllOrders)
orderRoute.put("/updateOrder", userAuth, updateOrder)




export default orderRoute