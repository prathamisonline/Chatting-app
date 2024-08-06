import express from "express"
import connectToMongoDB from "./db/connectToMongoDB.js"

const app = express()


app.get("/", (req, res) => {
    res.send("hello worlddfs")
})

app.listen(4000, async () => {
    await connectToMongoDB();
    console.log("app is running at server 4000")
})