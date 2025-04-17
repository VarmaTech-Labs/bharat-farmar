import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';

const NoInternetScreen: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);

  const checkInternet = async () => {
    try {
      const response = await fetch('https://www.google.com', { method: 'HEAD' });
    //   setIsConnected(response.ok);
    } catch (error) {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkInternet();
    const intervalId = setInterval(checkInternet, 5000); // check every 5 seconds
    return () => clearInterval(intervalId);
  }, []);


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Image
        source={{ uri: 'https://i.imgur.com/yW2W9SC.png' }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>🚫 No Internet Connection</Text>
      <Text style={styles.subtitle}>
        📡 Oops! It looks like you're offline. Please check your network and try again.
      </Text>
      <TouchableOpacity onPress={checkInternet} style={styles.button}>
        <Text style={styles.buttonText}>🔄 Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoInternetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
