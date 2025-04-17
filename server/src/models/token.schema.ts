import mongoose from "mongoose";


const tokenSchama = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    accessToken:{
        type:String,
        required:true
    },
});

const tokenModel = mongoose.model("token",tokenSchama)

export default tokenModel;