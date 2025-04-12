import mongoose from "mongoose";
import { IUser } from "../types/user.types.js";

const userSchema = new mongoose.Schema<IUser>({
     firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    phone: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
})

const userModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default userModel;