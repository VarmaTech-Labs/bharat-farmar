import mongoose from "mongoose";
import { IUser } from "../types/user.types.js";

const userSchema = new mongoose.Schema<IUser>({
     name: {
        type: String,
        required: false,
    },
   
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    phone: {
        type: String,
        required: false,
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
    }
})

const userModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default userModel;