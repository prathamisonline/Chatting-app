import mongoose, { Schema } from "mongoose";

export const conversationSchema = new Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ]
})

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
