import express from "express"
import { adminLogin, loginUser, registerUser, getUserDetails, getAllUser } from "../controller/userController.js"
import userAuth from "../middleware/userAuth.js"
import adminAuth from "../middleware/adminAuth.js"

const userRoute = express.Router()



userRoute.post("/registerUser", registerUser)
userRoute.post("/loginUser", loginUser)
userRoute.post("/loginAdmin", adminLogin)
userRoute.get("/userDetails", userAuth, getUserDetails)
userRoute.get("/getAllUser", adminAuth, getAllUser)



export default userRoute