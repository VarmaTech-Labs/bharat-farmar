import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Feather, Entypo } from '@expo/vector-icons';

const services = [
  { id: '1', label: 'Seeds & Plants', icon: <MaterialCommunityIcons name="sprout" size={24} color="green" /> },
  { id: '2', label: 'Weather Alert', icon: <Feather name="cloud-lightning" size={24} color="#555" /> },
  { id: '3', label: 'Kisan Credit', icon: <FontAwesome5 name="rupee-sign" size={22} color="#333" /> },
  { id: '4', label: 'Crop Insurance', icon: <FontAwesome5 name="hand-holding-heart" size={22} color="tomato" /> },
  { id: '5', label: 'Equipment', icon: <MaterialCommunityIcons name="tractor" size={24} color="#666" /> },
  { id: '6', label: 'Training', icon: <MaterialCommunityIcons name="school" size={24} color="#2e86de" /> },
  { id: '7', label: 'Community', icon: <Feather name="users" size={24} color="#555" /> },
  { id: '8', label: 'More', icon: <Entypo name="dots-three-horizontal" size={24} color="#aaa" /> },
];

const AgriculturalServicesGrid = () => {
  const renderItem = ({ item }:any) => (
    <TouchableOpacity style={styles.item}>
      {item.icon}
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agricultural Services</Text>
      <FlatList
        data={services}
        numColumns={4}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default AgriculturalServicesGrid;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  grid: {
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    marginVertical: 12,
  },
  label: {
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
    color: '#444',
  },
});
