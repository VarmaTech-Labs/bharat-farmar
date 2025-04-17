import React, { useState, useEffect } from "react";
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
import { userSignup } from "@/utils/api/userApis";
import { showErrorDialog, showErrorToast } from "@/utils/alertNotifier";
import ThreeDotLoader from "@/components/ThreeDotLoader";

const { width, height } = Dimensions.get("window");



const InputField = ({
  label,
  value,
  setValue,
  error,
  placeholder,
  keyboardType = "default",
  isEmail = false,
  shakeAnim,
}: {
  label: string;
  value: string;
  setValue: (text: string) => void;
  error: boolean;
  placeholder: string;
  keyboardType?: any;
  isEmail?: boolean;
  shakeAnim?: Animated.Value;
}) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <Animated.View style={error && shakeAnim ? { transform: [{ translateX: shakeAnim }] } : {}}>
      <TextInput
        style={[
          styles.input,
          value.length === 0 ? styles.inputDefault : error ? styles.inputError : styles.inputValid,
        ]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={isEmail ? "none" : "sentences"}
        value={value}
        onChangeText={setValue}
      />
    </Animated.View>
    {error && <Text style={styles.errorText}>{label} is not valid</Text>}
  </>
);

 
const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const shakeAnim = useState(new Animated.Value(0))[0];
  const router = useRouter();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const shakeInput = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleSignUp = async () => {
    let valid = true;
  
    if (name.trim().length < 3) {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }
  
    if (!isValidEmail(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }
  
    if (!valid) {
      shakeInput();
      return;
    }
  
    setLoading(true);
  
    try {
      const result:any = await userSignup({ name, email });
  
      if (result.success) {
        router.replace("/login");
      } else {
        showErrorDialog('Signup Failed', result.message || 'Something went wrong.');
      }
    } catch {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <InputField
        label="Full Name"
        value={name}
        setValue={(text) => {
          setName(text.trim());
          setNameError(text.trim().length > 0 && text.trim().length < 3);
        }}
        error={nameError}
        placeholder="Enter your full name"
      />

      <InputField
        label="Email Address"
        value={email}
        setValue={(text) => {
          setEmail(text.trim());
          setEmailError(text.length > 0 && !isValidEmail(text));
        }}
        error={emailError}
        placeholder="Enter your email"
        keyboardType="email-address"
        isEmail
        shakeAnim={shakeAnim}
      />

      <TouchableOpacity style={[styles.button, loading && { opacity: 0.7 }]} onPress={handleSignUp} disabled={loading}>
        {loading ? <ThreeDotLoader /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
 
export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/images/farmer-logo.png")} />
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Sign up to access exclusive farmer services.</Text>
      <SignUpForm />
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
    width: width - 70,
    height: 240,
    alignSelf: "center",
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
