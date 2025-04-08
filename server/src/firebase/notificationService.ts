import admin from 'firebase-admin';
import serviceAccount from './bharat-farmer-firebase-adminsdk-fbsvc-9113adb31b.json' with { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const sendNotificationToUser = async (
  deviceToken: string,
  title: string,
  body: string,
  data: Record<string, string> = {}
) => {
  const message: admin.messaging.Message = {
    token: deviceToken,
    notification: { title, body },
    data,
  };

  try {
    const response = await admin.messaging().send(message);
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendNotificationToAll = async (
  deviceTokens: string[],
  title: string,
  body: string,
  data: Record<string, string> = {}
) => {
  const message: admin.messaging.MulticastMessage = {
    tokens: deviceTokens,
    notification: { title, body },
    data,
  };

  try {
    const response = await(admin.messaging() as any).sendMulticast(message) ;

    return response;
  } catch (error) {
    throw error;
  }
};



