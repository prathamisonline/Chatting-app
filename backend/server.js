import express from "express";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js"
import authRoutes from "./router/authRoutes.js"
import dotenv from "dotenv";

const app = express()
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

dotenv.config();
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("hello worlddfs")
})

app.listen(4000, async () => {
    await connectToMongoDB();
    console.log("app is running at server 4000")
})
