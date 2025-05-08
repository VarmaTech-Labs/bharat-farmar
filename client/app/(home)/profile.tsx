import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Image, TextInput, StyleSheet,
  Modal, Alert, Animated, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { handleTakePhoto } from '@/utils/clickPicture';
import { TouchableWithoutFeedback } from 'react-native';

const Profile = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const cameraAnimation = new Animated.Value(1);

  const [username, setUsername] = useState("johndoe123");
  const [name, setName] = useState("Arvind Varma kumar");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("1234567890");
  const [address, setAddress] = useState("123 Main Street, Dwarka Sector 7, New Delhi, Delhi, India - 110075");
  const [inRemaining, setInRemaining] = useState("Indian");

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated!');
  };

  const animateCameraIcon = () => {
    Animated.sequence([
      Animated.timing(cameraAnimation, { toValue: 1.3, duration: 150, useNativeDriver: true }),
      Animated.timing(cameraAnimation, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const FormField = ({ label, value, onChangeText, editable = true, keyboardType = "default", multiline = false }: any) => (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea, !editable && styles.disabledInput]}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );

  const ProfileImage = () => (
    <TouchableOpacity onPress={() => { animateCameraIcon(); setModalVisible(true); }}>
      {profilePic ? (
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
      ) : (
        <View style={styles.profilePlaceholder}>
          <Ionicons name="person" size={60} color="#ccc" />
        </View>
      )}
      <Animated.View style={[styles.cameraIconContainer, { transform: [{ scale: cameraAnimation }] }]}>
        <Ionicons name="camera" size={20} color="#fff" />
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.profilePicContainer}>
          <ProfileImage />
          <View style={styles.userDetails}>
            <Text style={styles.userNameText}>{name}</Text>
            <Text style={styles.userAddressText}>{address}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <FormField label="Username" value={username} onChangeText={setUsername} editable={isEditing} />
            </View>
            <View style={styles.halfWidth}>
              <FormField label="Name" value={name} onChangeText={setName} editable={isEditing} />
            </View>
          </View>

          <FormField label="Email" value={email} onChangeText={setEmail} editable={isEditing} keyboardType="email-address" />
          <FormField label="Phone" value={phone} onChangeText={setPhone} editable={isEditing} keyboardType="phone-pad" />
          <FormField label="Address" value={address} onChangeText={setAddress} editable={isEditing} multiline={true} />
          <FormField label="Nationality" value={inRemaining} onChangeText={setInRemaining} editable={isEditing} />

          <TouchableOpacity
            style={styles.button}
            onPress={isEditing ? handleSave : () => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>{isEditing ? "Save Profile" : "Edit Profile"}</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>

          <View style={styles.modalOverlay} >
            <View style={styles.modalContent}>
              <View style={styles.btnGroup}>
                <TouchableOpacity style={[styles.modalButton, styles.primaryBtn]} onPress={handlePickImage}>
                  <MaterialIcons name="photo-library" size={26} color="white" />
                  <Text style={styles.modalButtonText}>Pick from Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.modalButton, styles.primaryBtn]} onPress={() => handleTakePhoto(setProfilePic, setModalVisible)}>
                  <MaterialIcons name="photo-camera" size={26} color="white" />
                  <Text style={styles.modalButtonText}>Take a Photo</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <MaterialIcons name="cancel" size={26} color="white" />
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

            </View>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 90,
  },
  profilePicContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#00B86B',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  profilePic: {
    width: 110,
    height: 110,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profilePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: -4,
    backgroundColor: '#00B86B',
    borderRadius: 100,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    width: 32,
    borderColor: '#fff',
  },
  userDetails: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  userNameText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  userAddressText: {
    paddingHorizontal: 30,
    textAlign: "center",
    color: 'rgba(255,255,255,0.8)',
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17.8
  },
  infoContainer: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  fieldWrapper: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: "#444",
    marginBottom: 4,
    marginLeft: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "transparent",
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#aaa',
  },
  button: {
    backgroundColor: "#00B86B",
    paddingVertical: 12,
    borderRadius: 30,
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfWidth: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'rgba(253, 242, 242, 0.8)',
    width: '90%',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 14,
    gap: 10,
    marginBottom: 60,
  },
  modalButton: {
    display: "flex",
    alignItems: 'center',
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 8,
    width: "48%",
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#ff6361',
    width: "100%",
  },
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    gap: 10,
  },
  primaryBtn: {
    backgroundColor: '#00B86B',
  },
});
