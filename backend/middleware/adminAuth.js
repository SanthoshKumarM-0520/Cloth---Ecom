import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
    try {
        let token = req.headers.authorization


        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Login to access this Route"
            })
        }
        if (token.startsWith("Bearer")) {
            token = token.split(" ")[1]
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        if (token_decode != process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(404).json({
                success: false,
                message: "Not Authorized Admin Login"
            })

        }
        next()
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};


export default adminAuth