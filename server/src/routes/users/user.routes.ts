import express, { IRouter } from 'express';
import { requestOtp, signup, verifyOtp } from '../../controllers/users/user.controllers.js';
const userRouter:IRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/request-otp", requestOtp);
userRouter.post("/verify-otp", verifyOtp);
export default userRouter;

