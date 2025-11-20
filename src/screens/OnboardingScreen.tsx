import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

export default function OnboardingScreen({navigation}) {
  const pages = [
    {
      backgroundColor: '#B6CF7B',
      image: (
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      ),
      title: 'Selamat Datang!',
      subtitle: 'Satu sentuhan untuk menemukan bantuan terbaik di sekitarmu.',
    },
    {
      backgroundColor: '#B6CF7B',
      image: (
        <Image
          source={require('../assets/frame3.png')}
          style={styles.image}
          resizeMode="contain"
        />
      ),
      title: 'Semua bantuan dalam genggamanmu',
      subtitle:
        'Dari bersih-bersih rumah, servis motor, hingga tutor privat — semua ada di HelpYu!',
    },
    {
      backgroundColor: '#B6CF7B',
      image: (
        <Image
          source={require('../assets/frame4.png')}
          style={styles.image}
          resizeMode="contain"
        />
      ),
      title: 'Bantuan cepat dan mudah',
      subtitle: 'Temukan jasa yang kamu butuhkan hanya dengan beberapa klik.',
    },
    {
      backgroundColor: '#B6CF7B',
      image: (
        <Image
          source={require('../assets/frame5.png')}
          style={styles.image}
          resizeMode="contain"
        />
      ),
      title: 'Profesional terpercaya',
      subtitle: 'Semua pekerja kami telah terverifikasi dan berkualitas.',
    },
    {
      backgroundColor: '#B6CF7B',
      image: (
        <Image
          source={require('../assets/frame6.png')}
          style={styles.image}
          resizeMode="contain"
        />
      ),
      title: 'Mulai sekarang!',
      subtitle: 'Temukan semua bantuan hanya dalam satu aplikasi.',
    },
  ];

  return (
    <Onboarding
      pages={pages}
      onDone={() => navigation.replace('SignInScreen')}
      onSkip={() => navigation.replace('SignInScreen')}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 309,
    height: 252,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    opacity: 0.8,
  },
});
