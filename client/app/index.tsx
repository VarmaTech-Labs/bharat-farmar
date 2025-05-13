import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import OnboardingScreen from "@/screens/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

// Prevent automatic hiding of splash screen
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [isOnboarding, setIsOnboarding] = useState<boolean | null>(null);
  const user = useSelector((state: any) => state.user);
  const router = useRouter();

  useEffect(() => {
    const prepare = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const result = await AsyncStorage.getItem("onboarding");
        if (result === "completed") {
          setIsOnboarding(true);
          if (!user?.isLoggedIn) {
            router.replace("/login");
          } else {
            router.replace("/home");
          }
        } else {
          setIsOnboarding(false);
        }
      } catch (e) {
        console.warn("Splash error:", e);
      } finally {
       
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, [user]);

  if (isOnboarding === null) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require("../assets/images/splash.png")} 
          style={styles.splashImage}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {!isOnboarding && <OnboardingScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "3fff",
  },
  splashImage: {
    width: "100%",
    height:"100%",
  },
  loading: {
    marginTop: 20,
  },
});
