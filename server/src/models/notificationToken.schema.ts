import mongoose from "mongoose";
import { INotificationToken } from "../types/notificationToken.type.js";

 const notificationTokenSchema = new mongoose.Schema<INotificationToken>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    
},{timestamps: true});

 const notificationTokenModel = mongoose.models.NotificationToken || mongoose.model<INotificationToken>('NotificationToken', notificationTokenSchema);
 export default notificationTokenModel;