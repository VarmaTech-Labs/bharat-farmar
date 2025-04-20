import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Header = ({ userName = 'Varvaert', avatarUri }: { userName?: string; avatarUri?: string }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Row */}
      <Animated.View style={[styles.topRow, { opacity: fadeAnim }]}>
        {/* Menu Icon */}
        <TouchableOpacity activeOpacity={0.7}>
          <MaterialIcons name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Greeting */}
        <Text style={styles.greeting}>Hi, {userName}</Text>

        {/* Avatar */}
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={{
              uri: avatarUri || 'https://i.pravatar.cc/150?img=3',
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Animated Search Bar */}
      <Animated.View
        style={[
          styles.searchContainer,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <MaterialIcons name="search" size={22} color="#00B86B" />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </Animated.View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: '#00B86B',
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  searchContainer: {
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: '#000',
  },
});
