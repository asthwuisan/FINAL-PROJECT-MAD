import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { OnboardFlow } from 'react-native-onboard';

const OnboardingScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      backgroundColor: '#B6CF7B', // Added background color
    },
    image: {
      width: 309,
      height: 252,
      marginBottom: 24,
    },
    title: {
      fontSize: 20,
      fontWeight: '800',
      color: 'white', // Changed for better contrast
      marginBottom: 16,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      color: 'white', // Changed for better contrast
      textAlign: 'center',
      opacity: 0.8,
    },
  });

  const pages = [
    {
      imageUri: Image.resolveAssetSource(require('../assets/logo.png')).uri,
      title: 'Selamat Datang!',
      subtitle: 'Satu sentuhan untuk menemukan bantuan terbaik di sekitarmu.',
    },
    {
      title: 'Semua bantuan dalam genggamanmu',
      subtitle:
        'Dari bersih-bersih rumah, servis motor, hingga tutor privat — semua ada di HelpYu!',
      imageUri: Image.resolveAssetSource(require('../assets/frame3.png')).uri,
    },
    {
      title: 'Bantuan cepat dan mudah',
      subtitle: 'Temukan jasa yang kamu butuhkan hanya dengan beberapa klik.',
      imageUri: Image.resolveAssetSource(require('../assets/frame4.png')).uri,
    },
    {
      title: 'Profesional terpercaya',
      subtitle: 'Semua pekerja kami telah terverifikasi dan berkualitas.',
      imageUri: Image.resolveAssetSource(require('../assets/frame5.png')).uri,
    },
    {
      title: 'Mulai sekarang!',
      subtitle: 'Temukan semua bantuan hanya dalam satu aplikasi.',
      imageUri: Image.resolveAssetSource(require('../assets/frame6.png')).uri,
    },
  ];

  return (
    <OnboardFlow
      pages={pages}
      type="fullscreen"
      onDone={() => navigation.replace('SignInScreen')}
      onSkip={() => navigation.replace('SignInScreen')}
      renderItem={({ title, subtitle, imageUri }) => {
        return (
          <View style={styles.container}>
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={styles.image}
                resizeMode="contain"
              />
            )}
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        );
      }}
    />
  );
};

export default OnboardingScreen;
