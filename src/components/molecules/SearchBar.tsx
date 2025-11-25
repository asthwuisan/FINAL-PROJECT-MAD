import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  style?: any;
}

const SearchBar = ({
  placeholder = 'Cari jasa yang anda perlukan',
  onChangeText,
  style,
}: SearchBarProps) => {
  return (
    <View
      style={[styles.container, style]}
    >
      <Image
        source={require('../../assets/search.png')}
        style={{ width: 20, height: 20, tintColor: '#555' }}
      />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
});
