import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDatabase from "./config/mongoDb.js";
import configCloudinary from "./config/cloudinary.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import { deleteData, insertData } from "./assets/products_cleaned.js";
import { fileURLToPath } from "url"
import path from "path";
import cartRouter from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";




//App Config
const app = express();
const port = process.env.PORT || 8080;
connectDatabase()
configCloudinary()

//Initial Product Data 
//insertData()
//deleteData()


//For static config
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const staticFile = path.join(__dirname, "assets/images")
app.use("/images", express.static(staticFile))




//Middleware
app.use(express.json());
app.use(cors());

//Api Endpoint
app.use("/api/v1/user", userRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/order", orderRoute)

app.listen(8080, () => {
    console.log(`Server runs at ${port}.....🚀`);
});
