import express from "express"
import { getMessage, sendMessage, updateRead } from "../controller/messageController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();


router.post("/send/:id", protectRoute, sendMessage)
router.get("/:id", protectRoute, getMessage)
router.put("/:id", protectRoute, updateRead)

export default router