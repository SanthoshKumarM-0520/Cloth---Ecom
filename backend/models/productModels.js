import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    date: { type: Number },
    bestseller: { type: Boolean, required: true },

})


const Product = mongoose.model.product || mongoose.model("product", productSchema)


export default Product