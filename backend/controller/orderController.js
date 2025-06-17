import Orders from "../models/ordersModels.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECERT_KEY)


const postNewOrder = async (req, res) => {
    try {
        let newOrder = { ...req.body, customerId: req.user._id };

        await Orders.create(newOrder);

        res.status(200).json({
            status: true,
        });
    } catch (error) {
        console.log(error);

        res.status(404).json({
            status: false,
        });
    }
};

const userOrders = async (req, res) => {
    try {
        const user = req.user._id;

        const orders = await Orders.find({ customerId: user });

        res.status(200).json({
            status: true,
            userOrders: orders,
        });
    } catch (error) {
        console.log(error);

        res.status(404).json({
            status: false,
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.find({});
        res.status(200).json({
            status: true,
            orders,
        });
    } catch (error) {
        console.log(error);

        res.status(404).json({
            status: false,
        });
    }
};

const updateOrder = async (req, res) => {
    try {

        const { status, orderId } = req.body

        await Orders.findByIdAndUpdate(orderId, { orderStatus: status })

        res.status(200).json({
            status: true
        })

    } catch (error) {
        res.status(400).json({
            status: false
        })
    }

}



export { postNewOrder, userOrders, getAllOrders, updateOrder, };
