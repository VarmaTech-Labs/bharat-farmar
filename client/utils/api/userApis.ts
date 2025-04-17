import axiosClient from "./axiosClient";

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// 🔹 Signup API
export const userSignup = async (userData: any): Promise<ApiResponse> => {
  try {
    const res = await axiosClient.post(`/api/users/signup`, userData);

    return {
      success: true,
      data: res.data,
      message: "Signup successful",
    };
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message ||
      err?.message ||
      "Something went wrong during signup.";
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// 🔹 Send OTP for Login
export const sendLoginOtp = async (email: string): Promise<ApiResponse> => {
  try {
    const res = await axiosClient.post(`/api/users/login`, { email });

    return {
      success: true,
      message: res?.data?.message || "OTP sent to your email.",
    };
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to send OTP.";
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// 🔹 User Login with OTP
export const userLogin = async (
  email: string,
  otp: number | string,
  notificationToken: string
): Promise<ApiResponse> => {
  try {
    const res = await axiosClient.post(`/api/users/login`, {
      email,
      otp,
      notificationToken,
    });

    return {
      success: true,
      data: res.data,
      message: "Login successful",
    };
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message ||
      err?.message ||
      "OTP verification failed.";
    return {
      success: false,
      message: errorMessage,
    };
  }
};
