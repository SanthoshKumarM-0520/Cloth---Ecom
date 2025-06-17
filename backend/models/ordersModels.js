import mongoose from "mongoose"


const orderSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    orderItem: { type: Array, required: true },
    payment: { type: String, required: true },
    orderStatus: { type: String, required: true, default: "Order Placed" },
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now }
})


const Orders = mongoose.model("order", orderSchema)

export default Orders