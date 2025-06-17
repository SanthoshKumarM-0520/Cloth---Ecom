import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

const userAuth = async (req, res, next) => {


    try {
        const token = req.headers.authorization || req.headers.token;


        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
};

export default userAuth;
