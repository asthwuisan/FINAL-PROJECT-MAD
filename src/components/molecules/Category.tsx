import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const defaultCategories = [
  { name: 'Help Rumah', source: require('../../assets/HelpRumah.png'), screen: 'HelpRumah' },
  { name: 'Help Antar', source: require('../../assets/HelpAntar.png'), screen: 'HelpAntar' },
  { name: 'Help Pintar', source: require('../../assets/HelpPintar.png'), screen: 'HelpPintar' },
  { name: 'Help Tekno', source: require('../../assets/HelpTekno.png'), screen: 'HelpTekno' },
];

interface CategoryProps {
  navigation?: any;
  categories?: typeof defaultCategories;
  style?: any;
}

const Category = ({ navigation, categories = defaultCategories, style }: CategoryProps) => {
  const handleCategoryPress = (screenName: string) => {
    if (navigation) {
      navigation.navigate(screenName);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryItem}
          onPress={() => handleCategoryPress(category.screen)}>
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
