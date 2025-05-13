import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MarketPrices = () => {
    const router = useRouter()
  const priceData = [
    { id: 1, commodity: 'Rice (Basmati)', price: '$2,400/q', change: '+¥200' },
    { id: 2, commodity: 'Wheat (Grade A)', price: '$2,100/q', change: '+¥150' },
    { id: 3, commodity: 'Cotton', price: '$6,800/q', change: '+¥300' },
  ];

  const handleViewAll = () => {
    router.replace("/market" as any)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Market Prices</Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {priceData.map((item) => (
        <View key={item.id} style={styles.priceItem}>
          <Text style={styles.commodity}>{item.commodity}</Text>
          <View style={styles.priceInfo}>
            <Text style={styles.price}>{item.price}</Text>
            {/* <Text style={styles.change}>{item.change}</Text> */}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    // paddingBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    color: '#007AFF',
    fontSize: 13,
    fontWeight: '500',
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  commodity: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 12,
    minWidth: 80,
    textAlign: 'right',
  },
  change: {
    fontSize: 14,
    color: '#4CAF50',
    minWidth: 50,
    textAlign: 'right',
  },
});

export default MarketPrices;