import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import { sendLoginOtp, userLogin } from "@/utils/api/userApis";
import { showErrorDialog } from "@/utils/alertNotifier";
import ThreeDotLoader from "@/components/ThreeDotLoader";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/userSlice";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [emailBorderColor, setEmailBorderColor] = useState("#ccc");
  const [otpBorderColor, setOtpBorderColor] = useState("#ccc");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const shakeAnim = new Animated.Value(0);
  const [notificationToken, setNotificationToken] = useState<string | null>(null);
  const dispatch  = useDispatch()

  const shakeInput = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text.length === 0) {
      setEmailBorderColor("#ccc");
      setEmailError("");
    } else if (emailRegex.test(text)) {
      setEmailBorderColor("green");
      setEmailError("");
      shakeInput();
    } else {
      setEmailBorderColor("red");
      setEmailError("Enter a valid email address");
    }
  };

  const handleOtpChange = (text: string) => {
    setOtp(text);
    if (text.length === 0) {
      setOtpBorderColor("#ccc");
      setOtpError("");
    } else if (/^\d{6}$/.test(text)) {
      setOtpBorderColor("green");
      setOtpError("");
    } else {
      setOtpBorderColor("red");
      setOtpError("Enter a valid 6-digit OTP");
    }
  };

  const handleSendOTP = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailBorderColor("red");
      setEmailError("Please enter a valid email address");
      shakeInput();
      return;
    }

    setLoading(true);
    const response = await sendLoginOtp(email);

    if (response.success) {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setNotificationToken(token);
       setLoading(false);
      setStep("otp");
      setEmailBorderColor("#ccc");
      setEmailError("");
    } else {
      setEmailBorderColor("red");
      shakeInput();
      setLoading(false);

      showErrorDialog("Failed to Send OTP", response.message);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setOtpBorderColor("red");
      setOtpError("Please enter a valid 6-digit OTP");
      shakeInput();
      return;
    }

    setLoading(true);
    const response = await userLogin(email, otp, notificationToken || "");
    
    if (response.success) {
      dispatch(loginSuccess(response.data))
      setLoading(false);
      setOtpBorderColor("#ccc");
      setOtpError("");
      router.push("/home" as any);
    } else {
      setOtpBorderColor("red");
      shakeInput();
      setLoading(false);
      showErrorDialog("Login Failed", response.message);
    }
  };

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        alert("Permission for push notifications was denied!");
        return;
      }
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/images/farmer-logo.png")} />

      <Text style={styles.title}>Sign in to Bharat Farmer</Text>
      <Text style={styles.subtitle}>
        Securely log in using your email and start exploring farmer services.
      </Text>

      {step === "email" ? (
        <>
          <Text style={styles.label}>Email Address</Text>
          <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
            <TextInput
              style={[styles.input, { borderColor: emailBorderColor }]}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={handleEmailChange}
            />
            {emailError ? <Text style={styles.inputError}>{emailError}</Text> : null}
          </Animated.View>

          <TouchableOpacity style={styles.button} onPress={handleSendOTP} disabled={loading}>
            {loading ? (
              <ThreeDotLoader />
            ) : (
              <Text style={styles.buttonText}>Send OTP</Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter OTP</Text>
          <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
            <TextInput
              style={[styles.input, { borderColor: otpBorderColor }]}
              placeholder="Enter 6-digit OTP"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={handleOtpChange}
            />
            {otpError ? <Text style={styles.inputError}>{otpError}</Text> : null}
          </Animated.View>

          <TouchableOpacity style={styles.button} onPress={handleVerifyOTP} disabled={loading}>
            {loading ? (
              <ThreeDotLoader />
            ) : (
              <Text style={styles.buttonText}>Verify and Continue</Text>
            )}
          </TouchableOpacity>
        </>
      )}

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/signup" as any)}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    paddingHorizontal: 24,
  },
  logo: {
    width: width - 70,
    height: 250,
    alignSelf: "center",
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#222",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6C6C6C",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 18,
    lineHeight: 22,
  },
  label: {
    fontSize: 13,
    color: "#444",
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 4,
    backgroundColor: "#fff",
  },
  inputError: {
    fontSize: 12,
    color: "red",
    paddingHorizontal: 4,
    marginTop: 2,
  },
  button: {
    backgroundColor: "#00B86B",
    paddingVertical: 14,
    borderRadius: 30,
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: "#444",
  },
  signupLink: {
    fontSize: 14,
    color: "#00B86B",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
