import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import Onboarding from "react-native-onboarding-swiper";


export default function OnboardingScreen({ navigation }) {
  const pages = [
    {
      backgroundColor: "transparent",
      image: (
        <Image
          source={require("../assets/logo.png")}
          style={styles.image}
          resizeMode="contain"
        />
      ),
      title: "Selamat Datang!",
      subtitle: "Satu sentuhan untuk menemukan bantuan terbaik di sekitarmu!",
    },
    {
      backgroundColor: "transparent",
      image: (
        <Image
          source={require("../assets/frame3.png")}
          style={styles.image}
          resizeMode="contain"
        />
      ),
      title: "Semua bantuan dalam genggamanmu",
      subtitle:
        "Dari bersih-bersih rumah, servis motor, hingga tutor privat — semua ada di HelpYu!",
    },
    {
      backgroundColor: "transparent",
      image: (
        <Image
          source={require("../assets/frame4.png")}
          style={styles.image}
          resizeMode="contain"
        />
      ),
      title: "Bantuan cepat dan mudah",
      subtitle: "Temukan jasa yang kamu butuhkan hanya dengan beberapa klik.",
    },
    {
      backgroundColor: "transparent",
      image: (
        <Image
          source={require("../assets/frame5.png")}
          style={styles.image}
          resizeMode="contain"
        />
      ),
      title: "Profesional terpercaya",
      subtitle: "Semua pekerja kami telah terverifikasi dan berkualitas.",
    },
    {
      backgroundColor: "transparent",
      image: (
        <Image
          source={require("../assets/frame6.png")}
          style={styles.image}
          resizeMode="contain"
        />
      ),
      title: "Mulai sekarang!",
      subtitle: "Temukan semua bantuan hanya dalam satu aplikasi.",
    },
  ];

  return (
    <ImageBackground
      source={require("../assets/background.png")}  // ganti sesuai nama file background kamu
      style={styles.background}
      resizeMode="cover"
    >
      <Onboarding
        pages={pages}
        onDone={() => navigation.replace("SignIn")}
        onSkip={() => navigation.replace("SignIn")}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    width: 450,
    height: 350,
    
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    color: '#202C60',
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#202C60',
    textAlign: "center",
    fontFamily: 'Poppins-Medium',
    opacity: 0.9,
  },
});
