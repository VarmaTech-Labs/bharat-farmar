import { NextFunction, Request, Response } from "express";
import userModel from "../../models/user.schema.js";
import error from "../../error/error.js";
import { sendCongratulationMail, sendOtpMail } from "../../services/mail/mail.handler.js";
import { generateOtp } from "../../utils/generate.otp.js";
import otpModel from "../../models/otp.schema.js";
import { generateAccessToken, generateRefreshToken } from "../../libs/token.js";
import tokenModel from "../../models/token.schema.js";
import notificationTokenModel from "../../models/notificationToken.schema.js";
import mongoose from "mongoose";


export const signup = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const { email, name } = req.body;

        if (!email || !name) {
            return next(error(400, "Credentials are required"));
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User account already exists" });
        }

        const newUser = await userModel.create({
            name,
            email,
            isVerified: false,
            isActive: false,
        });

        await sendCongratulationMail(newUser.name, newUser.email);

        return res.status(201).json({
            message: "User created successfully. Please Login now",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (err) {
        next(err);
    }
};


export const login = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    const { email, otp, notificationToken } = req.body;
  
    if (!email) return next(error(400, "Email is required"));
  
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const user = await userModel.findOne({ email }).session(session);
      if (!user) {
        await session.abortTransaction();
        return res.status(409).json({ message: "User account doesn't exist" });
      }
  
      if (!otp) {
        const generatedOtp = generateOtp() as any;
        await otpModel.create(
          [{
            userId: user._id,
            otp: generatedOtp,
            createdAt: new Date(),
          }],
          { session }
        );
  
        await sendOtpMail(user.email, generatedOtp);
        await session.commitTransaction();
  
        return res.status(200).json({ message: "OTP sent! Check your email to continue." });
      }
  
      // Validate OTP and check expiration (5 minutes)
      const storedOtp = await otpModel.findOne({ userId: user._id, otp }).session(session);
  
      if (!storedOtp) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Invalid OTP" });
      }
  
      const now = new Date();
      const otpAge = (now.getTime() - storedOtp.createdAt.getTime()) / (1000 * 60); // in minutes
  
      if (otpAge > 10) {
        await session.abortTransaction();
        return res.status(400).json({ message: "OTP has expired" });
      }
  
      const accessToken = generateAccessToken({ userId: user._id });
      const refreshToken = generateRefreshToken({ userId: user._id });
  
      await tokenModel.findOneAndUpdate(
        { userId: user._id },
        { accessToken },
        { new: true, upsert: true, session }
      );
  
      if (notificationToken) {
        await notificationTokenModel.findOneAndUpdate(
          { userId: user._id },
          { token: notificationToken },
          { new: true, upsert: true, session }
        );
      }
  
      await otpModel.deleteMany({ userId: user._id }).session(session);
  
      await session.commitTransaction();
  
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        refreshToken
      });
  
    } catch (err) {
      await session.abortTransaction();
      next(err);
    } finally {
      session.endSession();
    }
  };