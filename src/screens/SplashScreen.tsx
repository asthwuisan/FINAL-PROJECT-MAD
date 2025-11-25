import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';

const SplashScreen = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
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
