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

        const existingUser = await userModel.findOne({ email }).lean();

        if (existingUser) {
            return res.status(409).json({ message: "User account already exists" });
        }

        const newUser = await userModel.create({
            name,
            email,
            isVerified: false,
            isActive: false,
        });


         res.status(201).json({
            message: "User created successfully. Please Login now",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });

        setImmediate(async()=>{
         await sendCongratulationMail(newUser.name, newUser.email)
        })
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




export const requestOtp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { email } = req.body;

  if (!email) return next(error(400, "Email is required to send OTP."));

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(409).json({ message: `User with email '${email}' does not exist. Please sign up.` });
    }

    const generatedOtp = generateOtp();

    await otpModel.create({
      userId: user._id,
      otp: generatedOtp,
      createdAt: new Date(),
    });

    // Async email send to avoid delay
    setImmediate(() => {
      sendOtpMail(user.email, generatedOtp).catch(console.error);
    });

    return res.status(200).json({
      message: "OTP sent successfully. Check your email. It is valid for 10 minutes.",
    });
  } catch (err) {
    return next(error(500, "Server error while sending OTP."));
  }
};


export const verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { email, otp, notificationToken } = req.body;

  if (!email || !otp) {
    return next(error(400, "Both email and OTP are required for login."));
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(409).json({ message: `User with email '${email}' does not exist.` });
  }

  const storedOtp = await otpModel.findOne({ userId: user._id, otp });
  if (!storedOtp) {
    return res.status(400).json({ message: "Invalid or expired OTP. Please try again." });
  }

  const now = new Date();
  const otpAge = (now.getTime() - storedOtp.createdAt.getTime()) / (1000 * 60);
  if (otpAge > 10) {
    return res.status(400).json({ message: "OTP has expired. Request a new one." });
  }

  const accessToken = generateAccessToken({ userId: user._id });
  const refreshToken = generateRefreshToken({ userId: user._id });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
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
  } catch (err) {
    await session.abortTransaction();
    return next(error(500, "Server error during OTP verification."));
  } finally {
    session.endSession();
  }

  return res.status(200).json({
    message: "Login successful!",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    refreshToken,
  });
};
