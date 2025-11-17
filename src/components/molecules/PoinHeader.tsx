import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Pastikan sudah diinstal

// Interface untuk Props (walaupun tidak ada di komponen ini, ini praktik yang baik)
// interface PointHeaderProps {}

const PointHeader: React.FC = () => {
  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={['#A8E063', '#56AB2F']} // Warna hijau-kekuningan ke hijau-tua (sesuai gambar)
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
      >
        {/* Konten Utama Header */}
        <View style={styles.content}>
          <Text style={styles.title}>HelpYu Points</Text>
          <View style={styles.pointRow}>
            {/* Mengganti ikon koin dengan Image yang Anda sebutkan (love.png) */}
            <Image
              source={require('../assets/gradasi.png')}
              style={styles.icon}
            />
            <Text style={styles.points}>80</Text>
          </View>
          <Text style={styles.subtitle}>1 HelpYu Points = Rp1</Text>
          <Text style={styles.expiryText}>
            300 Points-mu kadaluarsa pada 01 Nov 2026
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden', // Penting untuk membatasi gradient sesuai border radius
    elevation: 5, // Shadow untuk Android
    shadowColor: '#000', // Shadow untuk iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 5,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 20, // Sesuaikan ukuran
    height: 20, // Sesuaikan ukuran
    marginRight: 8,
    tintColor: '#FFD700', // Warna kuning emas
    resizeMode: 'contain',
  },
  points: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 10,
  },
  expiryText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default PointHeader;
