import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import validator from "validator";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not exists",
            });
        }

        const passwordVerification = await bcrypt.compare(password, user.password);

        if (!passwordVerification) {
            return res.status(404).json({
                status: "fail",
                message: "Wrong Password",
            });
        }

        if (passwordVerification) {
            const token = generateToken(user._id);
            res.status(200).json({
                success: true,
                token: token,
                message: "Login Successfully",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exist = await User.findOne({ email });

        if (exist) {
            return res.status(404).json({
                status: "fail",
                message: "User already exist",
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(404).json({
                status: "fail",
                message: "Enter Valid Email Address",
            });
        }
        if (password.length < 8) {
            return res.status(404).json({
                status: "fail",
                message: "Password should be more than 8 Char",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(user._id);

        res.status(201).json({
            status: "success",
            token: token,
            message: "Signin Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            email == process.env.ADMIN_EMAIL &&
            password == process.env.ADMIN_PASSWORD
        ) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.status(200).json({
                success: true,
                token,
            });
        } else {
            res.status(404).json({
                status: "fail",
                message: "Email is not Approved as Admin",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        res.status(200).json({
            status: true,
            user,
        });
    } catch (error) {
        console.log(error);

        res.status(404).json({
            status: false,
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const users = await User.find({})

        res.status(200).json({
            status: true,
            users
        })
    } catch (error) {

        console.log(error);

        res.status(404).json({
            status: false,
        });

    }
}

export { loginUser, registerUser, adminLogin, getUserDetails, getAllUser };
