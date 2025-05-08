import { Stack } from 'expo-router';
import { Camera } from 'expo-camera';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import messaging from '@react-native-firebase/messaging';
import { getApp }  from '@react-native-firebase/app';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import { AlertNotificationRoot } from "react-native-alert-notification"
import React from 'react'; 


getApp();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📦 [Background] FCM message received:', remoteMessage);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: remoteMessage.notification?.title ?? '📢 New Message',
      body: remoteMessage.notification?.body ?? '',
      sound: 'default',
    },
    trigger: null,
  });

  setTimeout(async () => {
    const notifications = await Notifications.getPresentedNotificationsAsync();
    for (const notification of notifications) {

      await Notifications.dismissNotificationAsync(notification.request.identifier);

    }
  }, 5000);
});

export default function Layout() {
  const requestPermissions = async () => {
    try {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      console.log("📷 Camera Permission:", cameraStatus);

      const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
      console.log("🔔 Notification Permission:", notificationStatus);

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      console.log("📍 Location Permission:", locationStatus);

      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('✅ Firebase permission granted:', authStatus);
        const fcmToken = await messaging().getToken();
        console.log('📱 FCM Token:', fcmToken);
      }
    } catch (error) {
      console.error("❌ Permission Error:", error);
    }
  };

  useEffect(() => {
    requestPermissions();

    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('💬 [Foreground] FCM message received:', remoteMessage);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.notification?.title ?? '📢 New Notification',
          body: remoteMessage.notification?.body ?? '',
          sound: 'default',
        },
        trigger: null,
      });

      setTimeout(async () => {
        const notifications = await Notifications.getPresentedNotificationsAsync();
        for (const notification of notifications) {
          await Notifications.dismissNotificationAsync(notification.request.identifier);
        }
      }, 5000);
    });

    const unsubscribeOpened = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('📲 App opened from background notification:', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('📲 App opened from quit state via notification:', remoteMessage);
        }
      });

    return () => {
      unsubscribeForeground();
      unsubscribeOpened();
    };
  }, []);

  return (
    <AlertNotificationRoot
    dialogConfig={{
      closeOnOverlayTap: true,
    }}
  >

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
          </Stack>
        </PersistGate>

      </Provider>
    </AlertNotificationRoot>

  );
}
