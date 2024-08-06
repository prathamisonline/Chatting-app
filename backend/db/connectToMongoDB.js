import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://pratham:2581@cluster0.yb174h1.mongodb.net/chatapp?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};

export default connectToMongoDB;
