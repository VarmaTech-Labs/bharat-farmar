import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import OnboardingScreen from "@/screens/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export default function Index() {
  const [isOnboarding, setIsOnboarding] = useState<boolean | null>(null);
  const user = useSelector((state: any) => state.user);
  const router = useRouter();

  useEffect(() => {
    const getOnboardingStatus = async () => {
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
    };
    getOnboardingStatus();
  }, [isOnboarding, user]);


  if (isOnboarding === null) {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large" color="#00B86B" />
      </View>
    );
  }


  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {!isOnboarding && <OnboardingScreen />}
    </SafeAreaView>
  );
}
