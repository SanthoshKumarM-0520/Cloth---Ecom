import { status } from "init";
import User from "../models/userModels.js";

const addToCart = async (req, res) => {
    try {
        const { size, product } = req.body;
        const user = req.user;
        const userCart = user.cartData;

        let exist = false;
        let i;
        userCart.forEach((item, index) => {
            if (item.productId === product._id && item.size === size) {
                exist = true;
                i = index;
            }
        });

        if (exist) {
            userCart[i]["quantity"] += 1;
        } else {
            let newProduct = {
                productId: product._id,
                size: size,
                quantity: 1,
                img: product.image[0],
                name: product.name,
                price: product.price,
            };

            userCart.push(newProduct);
        }

        await User.findByIdAndUpdate(user._id, { cartData: userCart });

        res.status(200).json({
            success: true,
            cartDetails: userCart,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
        });
    }
};

const userCartDetail = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).json({
            status: true,
            cartDetails: user.cartData,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
        });
    }
};

const updateCart = async (req, res) => {
    try {
        const user = req.user._id;
        const userCart = req.user.cartData;
        const { product, qty, size } = req.body;

        for (let i = 0; i < userCart.length; i++) {
            if (userCart[i]["productId"] == product && userCart[i]["size"] == size) {
                userCart[i]["quantity"] = Number(qty);
            }
        }

        await User.findByIdAndUpdate(user, { cartData: userCart });

        res.status(200).json({
            status: true,
            cartData: userCart,
        });
    } catch (error) {
        console.log(error);

        res.status(404).json({
            status: false,
        });
    }
};

const deleteCartProduct = async (req, res) => {
    try {

        const user = req.user._id;
        let userCart = req.user.cartData;
        const { product, size } = req.body;

        userCart = userCart.filter((i) =>
            !(i.productId === product && i.size === size)
        );


        await User.findByIdAndUpdate(user, { cartData: userCart });



        res.status(200).json({
            status: true,
            cartData: userCart,
        })



    } catch (error) {
        res.status(404).json({
            status: false
        })
    }
}

const clearCart = async (req, res) => {

    try {
        const user = req.user._id

        await User.findByIdAndUpdate(user, { cartData: [] });

        res.status(200).json({
            status: true
        })

    } catch (error) {
        console.log(error);

        res.status(404).json({
            status: false
        })

    }

}

export { addToCart, userCartDetail, updateCart, deleteCartProduct, clearCart };
