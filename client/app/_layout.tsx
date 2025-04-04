import { Stack } from 'expo-router';
import { Camera } from 'expo-camera';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function Layout() {
  const requestPermissions = async () => {
    try {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      console.log("📷 Camera Permission:", cameraStatus);

      const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
      console.log("🔔 Notification Permission:", notificationStatus);

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      console.log("📍 Location Permission:", locationStatus);

      // google admob ads 
      

       
    } catch (error) {
      console.error("❌ Error requesting permissions:", error);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
