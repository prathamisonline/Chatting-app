import path from "path"
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./router/authRoutes.js"
import userRoutes from "./router/useRoutes.js"
import messageRoutes from "./router/messageRoutes.js"

import { app, server } from "./socket/socket.js";
import connectToMongoDB from "./db/connectToMongoDB.js"

dotenv.config();

const __dirname = path.resolve()

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(4000, async () => {
    await connectToMongoDB();
    console.log("app is running at server 4000")
})
