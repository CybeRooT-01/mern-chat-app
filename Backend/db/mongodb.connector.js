import mongoose from "mongoose";
const mongoDbConnector = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("connecter a mongodb");
    } catch (error) {
        console.log(error.message);
    }
}

export default mongoDbConnector