import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
            readStatus: false

        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([conversation.save(), newMessage.save()])

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendmessage controller", error.message)
        res.status(500).json({ error: "Internal server errorr" })
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        res.status(200).json(conversation.messages)

    } catch (error) {
        console.log("Error in getMessage controller", error.message)
        res.status(500).json({ error: "Internal server errorr" })
    }
}

export const updateRead = async (req, res) => {
    try {
        const { updateReadAll } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id

        if (!updateReadAll) {
            return res.status(400).json({ error: "updateReadAll is required" })
        }
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })  // Log the conversation and messages for debugging
        console.log("Conversation found:", conversation);
        console.log("Updating messages between sender:", senderId, "and receiver:", receiverId);


        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        const result = await Message.updateMany(
            { senderId: senderId, receiverId: receiverId },
            { $set: { readStatus: true } }
        );

        console.log("Update result:", result);
        res.status(200).json({ message: 'Messages marked as read' });
    } catch (error) {
        console.log("Error in updateReadStatus controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}