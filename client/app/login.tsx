import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  const router = useRouter();

  const handleSendOTP = () => {
    if (phone.length !== 10) {
      Alert.alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    // Normally, send OTP via backend here
    setStep("otp");
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      Alert.alert("Please enter a 6-digit OTP.");
      return;
    }
    // Normally, verify OTP with backend here
    Alert.alert("Login Successful ✅");
    router.push("/home"); // navigate to your home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Bharat Farmer</Text>
      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>
        Login with your mobile number to continue
      </Text>

      {step === "phone" ? (
        <>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="number-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

          <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="6-digit OTP"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
            <Text style={styles.buttonText}>Verify & Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    paddingTop: 100,
    paddingHorizontal: 24,
    backgroundColor: "#FDFDFD",
  },
  appName: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
    color: "#00B86B",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#222",
  },
  subtitle: {
    fontSize: 15,
    color: "#6C6C6C",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 24,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#00B86B",
    paddingVertical: 14,
    borderRadius: 30,
    width: "100%",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
