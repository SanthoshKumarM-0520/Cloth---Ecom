import mongoose from "mongoose"

const connectDatabase = async () => {
    await mongoose.connect(`${process.env.DB_URL}/ecom`).then(() => {
        console.log("DB Connected Successfully 🗃️✅");
    }).catch((err) => {
        console.log(err);

    })
}

export default connectDatabase