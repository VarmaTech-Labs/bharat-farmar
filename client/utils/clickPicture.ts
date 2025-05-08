import { Camera } from "expo-camera";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker"

  export const handleTakePhoto = async (setProfilePic:any ,setModalVisible:any) => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera access is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
      setModalVisible(false);
    }
  };