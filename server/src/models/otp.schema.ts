import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

const otpModel = mongoose.model("otp",otpSchema)

export default otpModel;