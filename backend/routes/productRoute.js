import expree from "express";
import {
    addProducts,
    allProducts,
    removeProducts,
    singleProducts,
} from "../controller/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";

const productRoutes = expree.Router();

productRoutes.post(
    "/addProducts",
    adminAuth,
    upload.array("image", 4),
    addProducts
);
productRoutes.get("/allProducts", allProducts);
productRoutes.delete("/removeProducts", adminAuth, removeProducts);
productRoutes.get("/singleProducts", singleProducts);

export default productRoutes;
