import mongoose, { Schema } from "mongoose";

export const messageSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    readStatus: {
        type: Boolean,
        required: false
    }

},
    { timestamps: true }
)

const Message = mongoose.model("Message", messageSchema)

export default Message 