import mongoose from "mongoose";
import { string } from "zod";

const otpSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    otp:{
        type:string,
        required:true
    }
})

const otpModel = mongoose.model("otp",otpSchema)

export default otpModel;