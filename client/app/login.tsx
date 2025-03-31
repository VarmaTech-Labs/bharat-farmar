import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneBorderColor, setPhoneBorderColor] = useState("#ccc");
  const [otpBorderColor, setOtpBorderColor] = useState("#ccc");
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  const router = useRouter()
  const shakeAnim = new Animated.Value(0);
  const [notificationToken, setNotificationToken] = useState<string | null>(null);
  

  const shakeInput = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
    if (text.length === 0) {
      setPhoneBorderColor("#ccc");
      setPhoneError("");

    } else if (/^\d{10}$/.test(text)) {
      setPhoneBorderColor("green");
      setPhoneError("");
      shakeInput();
    } else {
      setPhoneBorderColor("red");
      setPhoneError("Enter a valid 10-digit number");
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

  const handleSendOTP = async() => {
    if (phone.length !== 10) {
      setPhoneBorderColor("red");
      setPhoneError("Please enter a valid 10-digit mobile number");
      shakeInput();
      return;
    }
    setStep("otp");
    setPhoneBorderColor("#ccc");
    setPhoneError(""); 
    const token = (await Notifications.getExpoPushTokenAsync()).data;
   Alert.alert(token); 
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      setOtpBorderColor("red");
      setOtpError("Please enter a valid 6-digit OTP");
      shakeInput();
      return;
    }
    Alert.alert("Login Successful");
    router.push("/home" as any);
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
        Securely log in using your mobile number and start exploring farmer services.
      </Text>

      {step === "phone" ? (
        <>
          <Text style={styles.label}>Mobile Number</Text>
          <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
            <TextInput
              style={[styles.input, { borderColor: phoneBorderColor }]}
              placeholder="Enter your phone number"
              keyboardType="number-pad"
              maxLength={10}
              value={phone}
              onChangeText={handlePhoneChange}
            />
            {phoneError ? <Text style={styles.inputError}>{phoneError}</Text> : null}
          </Animated.View>

          <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
            <Text style={styles.buttonText}>Send OTP</Text>
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

          <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
            <Text style={styles.buttonText}>Verify and Continue</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Sign Up Option */}
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
    width: width - 60,
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
    paddingHorizontal:18,
    lineHeight:22
  },
  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
    marginTop: 10,
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
