import React, { useState } from "react";
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
  Easing,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("details");
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  
  const fadeAnim = useState(new Animated.Value(0))[0];
  const shakeAnim = useState(new Animated.Value(0))[0]; // Shake animation

  const router = useRouter();

  const shakeInput = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleChangeName = (text: string) => {
    setName(text);
    if (text.length === 0) {
      setNameError(false);
    } else {
      setNameError(text.trim().length < 3);
    }
  };

  const handleChangePhone = (text: string) => {
    setPhone(text);
    if (text.length === 0) {
      setPhoneError(false);
    } else {
      setPhoneError(text.length !== 10);
    }
  };

  const handleChangeOtp = (text: string) => {
    setOtp(text);
    if (text.length === 0) {
      setOtpError(false);
    } else {
      setOtpError(text.length !== 6);
    }
  };

  const handleSendOTP = async () => {
    let valid = true;

    if (name.trim().length < 3) {
      setNameError(true);
      shakeInput();
      valid = false;
    }

    if (phone.length !== 10) {
      setPhoneError(true);
      shakeInput();
      valid = false;
    }

    if (!valid) return;

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    try {
      setStep("otp");
      Alert.alert("OTP Sent", "Check your phone for the OTP.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to send OTP. Try again.");
    }
  };

  const handleSignUp = () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
      shakeInput();
      return;
    }
    Alert.alert("Signup Successful");
    router.push("/home" as any);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/images/farmer-logo.png")} />

      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Sign up to access exclusive farmer services.</Text>

      {step === "details" ? (
        <>
          <Text style={styles.label}>Full Name</Text>
          <Animated.View style={nameError && {  transform: [{ translateX: shakeAnim }] }}>
            <TextInput
              style={[
                styles.input,
                name.length === 0
                  ? styles.inputDefault
                  : nameError
                  ? styles.inputError
                  : styles.inputValid,
              ]}
              placeholder="Enter your full name"
              value={name}
              onChangeText={handleChangeName}
            />
          </Animated.View>
          {nameError && <Text style={styles.errorText}>Name must be at least 3 characters</Text>}

          <Text style={styles.label}>Mobile Number</Text>
          <Animated.View style={phoneError && { transform: [{ translateX: shakeAnim }] }}>
            <TextInput
              style={[
                styles.input,
                phone.length === 0
                  ? styles.inputDefault
                  : phoneError
                  ? styles.inputError
                  : styles.inputValid,
              ]}
              placeholder="Enter your phone number"
              keyboardType="number-pad"
              maxLength={10}
              value={phone}
              onChangeText={handleChangePhone}
            />
          </Animated.View>
          {phoneError && <Text style={styles.errorText}>Enter a valid 10-digit number</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.label}>Enter OTP</Text>
          <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
            <TextInput
              style={[
                styles.input,
                otp.length === 0
                  ? styles.inputDefault
                  : otpError
                  ? styles.inputError
                  : styles.inputValid,
              ]}
              placeholder="Enter 6-digit OTP"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={handleChangeOtp}
            />
          </Animated.View>
          {otpError && <Text style={styles.errorText}>OTP must be 6 digits</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.loginLink}>Login</Text>
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
    backgroundColor: "#FDFDFD",
  },
  logo: {
    width: width - 60,
    height: 240,
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
  inputDefault: {
    borderColor: "#ccc",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  inputValid: {
    borderColor: "#00B86B",
  },
  errorText: {
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
    fontSize: 16,
    textAlign: "center",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#444",
  },
  loginLink: {
    fontSize: 14,
    color: "#00B86B",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

