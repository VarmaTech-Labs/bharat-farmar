import { Schema } from "mongoose";

interface INotificationToken {
    userId: Schema.Types.ObjectId;
    token: string;
    
}

 export {INotificationToken}