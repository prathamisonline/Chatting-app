import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: string,
        required: true
    },
    userName: {
        type: string,
        required: true
    },
    password: {
        type: string,
        required: true,
        minlength: 6,
    },
    gender: {
        type: string,
        required: true,
        enum: ["male", "female"],
    },
    profilePic: {
        type: String,
        default: "",
    },
    fullName: {
        type: string,
        required: true
    },
},
    { timestamps: true }
)

const user = mongoose.model("User", userSchema);

export default user;

