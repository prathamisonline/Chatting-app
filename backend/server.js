import express from "express";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js"
import authRoutes from "./router/authRoutes.js"
import userRoutes from "./router/useRoutes.js"
import messageRoutes from "./router/messageRoutes.js"
import dotenv from "dotenv";
import { app, server } from "./socket/socket.js";

dotenv.config();
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
// const io = new Server(server);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.get("/", (req, res) => {
    res.send("hello worlddfs")
})

// io.on('connection', (socket) => {
//     console.log('a user connected');
// });

server.listen(4000, async () => {
    await connectToMongoDB();
    console.log("app is running at server 4000")
})
