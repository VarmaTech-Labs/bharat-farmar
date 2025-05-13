import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';

const dummyImageUrl = 'https://via.placeholder.com/40'; // Placeholder URL for the images

const initialSchemes = [
  {
    id: '1',
    title: 'Soil Health Card',
    description: 'Get detailed analysis of your soil quality and recommendations',
    type: 'government',
    image: dummyImageUrl,
    primaryLabel: 'Apply Now',
    secondaryLabel: 'Learn More →',
  },
  {
    id: '2',
    title: 'E-NAM Portal',
    description: 'Online trading platform for agricultural commodities',
    type: 'government',
    image: dummyImageUrl,
    primaryLabel: 'Register',
    secondaryLabel: 'Learn More →',
  },
  {
    id: '3',
    title: 'AgriConsult',
    description: 'Private expert consultation for modern farming',
    type: 'private',
    image: dummyImageUrl,
    primaryLabel: 'Book Now',
    secondaryLabel: 'Learn More →',
  },
];

const Schemes = () => {
  const [schemes, setSchemes] = useState(initialSchemes);

  const renderCard = (item: any) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.iconWrapper}>
        {/* Image rendering instead of Ionicons */}
        <Image source={{ uri: item.image }} style={styles.icon} />
      </View>
      <View style={styles.info}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>{item.primaryLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>{item.secondaryLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const addScheme = () => {
    const newScheme = {
      id: String(schemes.length + 1),
      title: 'New Scheme',
      description: 'Description of the new scheme.',
      type: 'government',
      image: dummyImageUrl,
      primaryLabel: 'Apply Now',
      secondaryLabel: 'Learn More →',
    };
    setSchemes(prevSchemes => [...prevSchemes, newScheme]);
  };

  const removeScheme = (id: string) => {
    setSchemes(prevSchemes => prevSchemes.filter(scheme => scheme.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Schemes</Text>
      {schemes.map(renderCard)}
    </ScrollView>
  );
};

export default Schemes;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 12,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    marginBottom: 12,
  },
  iconWrapper: {
    marginRight: 12,
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  info: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginVertical: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: '#007BFF',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 13,
  },
  link: {
    fontSize: 13,
    color: '#007BFF',
  }
});
