import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import Logo from '../assets/logo.png';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('OnboardingScreen'); // Pindah otomatis
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B6CF7B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 412,
    height: 410,
    marginBottom: 12,
    resizeMode: 'contain',
  },
});
