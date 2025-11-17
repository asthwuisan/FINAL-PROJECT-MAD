import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const categories = [
  { name: 'Help Rumah', source: require('../../assets/HelpRumah.png') },
  { name: 'Help Antar', source: require('../../assets/HelpAntar.png') },
  { name: 'Help Pintar', source: require('../../assets/HelpPintar.png') },
  { name: 'Help Tekno', source: require('../../assets/HelpTekno.png') },
];

const Category = () => {
  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryItem}>
          <Image source={category.source} style={styles.icon} />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 20, // Or adjust as needed
  },
  categoryItem: {
    alignItems: 'center',
    width: 80, // Adjust width as needed
  },
  icon: {
    width: 68,
    height: 68,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#202C5F',
  },
});

export default Category;
