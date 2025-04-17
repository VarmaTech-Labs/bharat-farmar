import mailConfiguration from "../../config/mail.config.js";
import congratutionTemplate from "./template/congratulationsEmail.template.js";
import forgetPasswordTemplate from "./template/forgetPassword.template.js";
import otpTemplate from "./template/otp.template.js";

export const sendCongratulationMail = async (name: string, recipientEmail: string): Promise<void> => {
  try {
    const transporter = await mailConfiguration();

    const mailOptions = {
      from:process.env.MAIL_USER,
      to: recipientEmail,
      subject: "🎉 Congratulations on Your Achievement!",
      html: congratutionTemplate(name),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ [Congratulations Email] Sent to ${recipientEmail}: ${info.messageId}`);
  } catch (error: any) {
    console.error(`❌ [Congratulations Email] Failed to send to ${recipientEmail}: ${error.message}`);
  }
};


export const sendOtpMail = async ( recipientEmail: string, otp: string): Promise<void> => {
  try {
    const transporter = await mailConfiguration();

    const mailOptions = {
      from:process.env.MAIL_USER,
      to: recipientEmail,
      subject: "🔐 Your OTP Code",
      html: otpTemplate(otp),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ [OTP Email] Sent to ${recipientEmail}: ${info.messageId}`);
  } catch (error: any) {
    console.error(`❌ [OTP Email] Failed to send to ${recipientEmail}: ${error.message}`);
  }
};


export const sendForgetPasswordMail = async (name: string, recipientEmail: string, otp: string): Promise<void> => {
  try {
    const transporter = await mailConfiguration();

    const mailOptions = {
      from:process.env.MAIL_USER,
      to: recipientEmail,
      subject: "🔁 Password Reset Request",
      html: forgetPasswordTemplate(name, otp),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ [Forget Password Email] Sent to ${recipientEmail}: ${info.messageId}`);
  } catch (error: any) {
    console.error(`❌ [Forget Password Email] Failed to send to ${recipientEmail}: ${error.message}`);
  }
};
