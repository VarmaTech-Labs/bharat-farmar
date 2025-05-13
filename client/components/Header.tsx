import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const languages = [
  'English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Kannada',
  'Malayalam', 'Marathi', 'Gujarati', 'Punjabi', 'Urdu', 'Odia',
];

const Header = () => {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;  // Modal animation state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
 const isRead =false

  useEffect(() => {
       const animation = Animated.loop(
        Animated.sequence([ 
          Animated.timing(shakeAnim, {
            toValue: isRead ? 0 : 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: isRead ? 0 : -1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: isRead ? 0 : 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
    }, []);

  const shakeInterpolation = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-5deg', '5deg'],
  });

  const selectLanguage = (lang:any) => {
    setSelectedLanguage(lang);
    setModalVisible(false);
  };

  // Handle Modal Open Animation
  useEffect(() => {
    if (modalVisible) {
      Animated.timing(modalAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(modalAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  const modalTranslateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0], // Slide effect from bottom to top
  });

  return (
    <>
      <View style={styles.header}>
        {/* Left Side */}
        <View style={styles.welcomeGroup}>
          <Image
            source={{ uri: 'https://avatar.iran.liara.run/public/2' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.title}>Bharat Farmer</Text>
            <Text style={styles.subtitle}>Welcome, Ramesh Kumar</Text>
          </View>
        </View>

        {/* Right Side */}
        <View style={styles.icons}>
          <Animated.View
            style={[styles.notificationBadge, { transform: [{ rotate: shakeInterpolation }] }]}
          >
            <Ionicons name="notifications-outline" size={24} color="#90928E" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </Animated.View>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="language" size={24} color="#90928E" style={{ marginLeft: 16 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Language Picker Modal with Animation */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[styles.modalContent, { transform: [{ translateY: modalTranslateY }] }]}
          >
            <Text style={styles.modalTitle}>Select Your Language</Text>
            <ScrollView
              contentContainerStyle={styles.languageList}
              showsVerticalScrollIndicator={false} // Hide the scrollbar
            >
              <FlatList
                data={languages}
                keyExtractor={(item) => item}
                numColumns={3} 
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => item !== selectedLanguage && selectLanguage(item)}
                    style={[styles.languageItem, item === selectedLanguage && styles.languageSelected]}
                  >
                    <Text
                      style={[styles.languageText, item === selectedLanguage && styles.languageSelected]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                )}
              />
            </ScrollView>

            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation:1,
  },
  welcomeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 12,
    borderColor: '#00B86B',
    borderWidth: 2.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00B86B',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#90928E',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: 'red',
    borderRadius: 100,
   
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    maxHeight: '80%',
    padding: 24,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  languageList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageItem: {
    width: '30%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderRadius: 8,
    marginHorizontal: 4.5,
    backgroundColor: '#f0f0f0',
  },
  languageText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
  languageSelected: {
    fontWeight: 'bold',
    color: '#00B86B',
    backgroundColor: '#e5f7e1',
  },
  closeButton: {
    backgroundColor: '#00B86B',
    marginTop: 20,
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
