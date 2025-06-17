import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModels.js";

const addProducts = async (req, res) => {
    try {

        const images = req.files;


        let newProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            subCategory: req.body.subCategory,
            sizes: JSON.parse(req.body.sizes),
            bestseller: req.body.bestseller === "true" ? true : false,
        };

        let imageUploadPromises = images.map((img) => {
            let result = cloudinary.uploader.upload(img.path, {
                resource_type: "image",
            });
            return result;
        });
        const resolveImagePromises = await Promise.all(imageUploadPromises);
        let imgUrl = resolveImagePromises.map((i) => i.secure_url);

        newProduct.image = imgUrl;

        const product = await Product.create(newProduct);

        res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(404).json({
            message: error.message,
            error,
        });
    }
};

const allProducts = async (req, res) => {

    try {
        const products = await Product.find({});

        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        res.status(404).json({
            message: error.message,
            error,
        });
    }
};

const removeProducts = async (req, res) => {
    try {
        const { id } = req.body;
        await Product.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(404).json({
            message: error.message,
            error,
        });
    }
};

const singleProducts = async (req, res) => {
    try {
        const { id } = req.body;

        const product = await Product.findById(id);

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(404).json({
            message: error.message,
            error,
        });
    }
};

export { addProducts, allProducts, removeProducts, singleProducts };
