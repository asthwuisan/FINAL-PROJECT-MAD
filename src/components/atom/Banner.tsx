import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface BannerCardProps {
  image: any;
  onPress?: () => void;
  style?: any;
}

const BannerCard = ({ image, onPress, style }: BannerCardProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image
        source={image}
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
