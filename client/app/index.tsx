import OnboardingScreen from "@/components/OnboardingScreen";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

export default function Index() {
  
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <OnboardingScreen/>
    </SafeAreaView>
  );
}
