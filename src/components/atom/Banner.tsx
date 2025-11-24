import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const BannerCard = ({ image, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={require('../../assets/BannerCard.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default BannerCard;

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 197,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
