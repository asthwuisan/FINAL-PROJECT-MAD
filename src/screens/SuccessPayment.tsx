import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions, // Digunakan untuk ukuran responsif
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Ambil ukuran layar untuk menentukan ukuran logo centang
const {width} = Dimensions.get('window');

// Prop-type yang sesuai dengan data teknisi dari PaymentPage
export interface SuccessPaymentProps {
  technicianName: string;
  technicianRole: string;
  technicianTag: string;
  technicianLocation: string;
  technicianPrice: string;
  technicianImage: any;
}

// Komponen untuk Badge "Help Rumah"
// Saya definisikan ulang di sini agar komponen ini mandiri
const HelpBadge = ({children}: {children: React.ReactNode}) => (
  <View style={styles.badgeContainer}>
    <Text style={styles.badgeText}>{children}</Text>
  </View>
);

const SuccessPaymentScreen = ({
  technicianName,
  technicianTag,
  technicianLocation,
  technicianPrice,
  technicianImage,
}: SuccessPaymentProps) => {
  const navigation = useNavigation() as any;

  // Gunakan data teknisi dari props untuk menampilkan informasi yang berhasil dibayar
  // Catatan: Pada aplikasi nyata, data ini biasanya diambil dari respons API setelah pembayaran.
  
  // Data dari gambar
  const imageSource = technicianImage; // Gambar teknisi
  const name = technicianName;
  const location = technicianLocation;
  const price = technicianPrice; // Rp150.000

  return (
    <View style={styles.container}>
      {/* Header Bar yang disederhanakan */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Success Payment</Text>
      </View>

      <View style={styles.content}>
        {/* Ikon Centang Besar */}
        <View style={styles.checkIconWrapper}>
          <Image
            source={{uri: 'https://i.imgur.com/k2H2q9s.png'}} // Contoh icon centang hijau. Ganti dengan aset lokal Anda
            style={styles.checkIcon}
            resizeMode="contain"
          />
        </View>

        {/* Teks Status */}
        <Text style={styles.successTitle}>PEMBAYARAN BERHASIL</Text>

        {/* Card Informasi Transaksi (Mirip Card di PaymentPage) */}
        <View style={styles.transactionCard}>
          <Image source={imageSource} style={styles.avatar} />
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.price}>{price}</Text>
            </View>
            <View style={styles.roleContainer}>
              <Text style={styles.location}>{location}</Text>
              <HelpBadge>{technicianTag}</HelpBadge>
            </View>
          </View>
        </View>
      </View>

      {/* Tombol Kembali ke Home */}
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('MainTabs')}>
        <Text style={styles.homeButtonText}>Kembali ke Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessPaymentScreen;

// --- Styling ---

const styles = StyleSheet.create({
  // Struktur Dasar
  container: {
    flex: 1,
    backgroundColor: 'white', // Latar belakang putih untuk layar sukses
    justifyContent: 'space-between', // Untuk menempatkan tombol di bawah
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingTop: 50, // Ruang dari header
  },

  // Header Bar (Disesuaikan untuk Success Payment)
  headerBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingTop: 50,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1B2559',
  },

  // Ikon Centang
  checkIconWrapper: {
    width: width * 0.25, // Sekitar 25% lebar layar
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    backgroundColor: '#8BC34A', // Warna hijau dari tombol
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkIcon: {
    width: '60%',
    height: '60%',
    tintColor: 'white', // Centang putih
  },
  
  // Teks Status
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B2559',
    marginBottom: 30,
    letterSpacing: 1,
  },

  // Card Informasi Transaksi
  transactionCard: {
    backgroundColor: '#F7F8FC', // Background abu-abu muda
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 8, // Di gambar, avatar tampak persegi dengan sudut melengkung
    marginRight: 16,
    backgroundColor: '#D1FAE5',
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: '#1B2559',
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    color: '#1B2559',
    fontWeight: '600',
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 13,
    fontWeight: '400',
    color: '#6B7280',
    marginRight: 10,
  },

  // Badge (Diambil dari PaymentPage)
  badgeContainer: {
    backgroundColor: '#D1FAE5',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#065F46',
  },

  // Tombol Kembali ke Home
  homeButton: {
    backgroundColor: '#BCE4A8', // Warna hijau muda dari desain
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginHorizontal: 16,
    marginBottom: 30, // Ruang dari bawah
  },
  homeButtonText: {
    color: '#386641', // Warna teks yang lebih gelap
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});