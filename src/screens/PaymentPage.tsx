import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// Komponen untuk Badge "Help Rumah"
const HelpBadge = ({children}: {children: React.ReactNode}) => (
  <View style={styles.badgeContainer}>
    <Text style={styles.badgeText}>{children}</Text>
  </View>
);

// Komponen untuk Item Pilihan Pembayaran (Radio Button)
const PaymentOption = ({
  label,
  isSelected,
  onPress,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.radioRow} onPress={onPress}>
    <View style={styles.radioCircle}>
      {isSelected && <View style={styles.radioInnerCircle} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

// --- Komponen Utama: PaymentPage ---

// Kita tidak membutuhkan semua props OrderCard untuk halaman pembayaran,
// tetapi kita akan memasukkan data teknisi sebagai props.
export interface PaymentPageProps {
  technicianName: string;
  technicianRole: string;
  technicianTag: string;
  technicianLocation: string;
  technicianPrice: string;
  technicianImage: any;
}

const PaymentPage = ({
  technicianName,
  technicianRole,
  technicianTag,
  technicianLocation,
  technicianPrice,
  technicianImage,
}: PaymentPageProps) => {
  const navigation = useNavigation();

  // State untuk mengelola input dan pilihan
  const [receiverName, setReceiverName] = React.useState('');
  const [receiverPhone, setReceiverPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [selectedPayment, setSelectedPayment] = React.useState('Transfer Bank');

  // Contoh data untuk tanggal (bisa diganti dengan DatePicker di implementasi nyata)
  const currentDate = 'Sab, 32 Des'; // Placeholder sesuai desain Anda

  // --- Bagian Card Informasi Teknisi (Mirip OrderCard) ---
  const TechnicianInfoCard = () => (
    <View style={styles.infoCard}>
      <Image source={technicianImage} style={styles.avatar} />
      <View style={styles.infoCardContent}>
        <View style={styles.infoCardHeader}>
          <Text style={styles.name}>{technicianName}</Text>
          <Text style={styles.price}>{technicianPrice}</Text>
        </View>
        <View style={styles.roleContainer}>
          <Text style={styles.role}>{technicianRole}</Text>
          <HelpBadge>{technicianTag}</HelpBadge>
        </View>
        <Text style={styles.location}>{technicianLocation}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButton}>Kembali</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buat Pesanan</Text>
        <View style={{width: 50}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Bagian 1: Informasi Penerima */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi Penerima</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Nama Penerima"
              value={receiverName}
              onChangeText={setReceiverName}
            />
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="No. Telp Penerima"
              keyboardType="phone-pad"
              value={receiverPhone}
              onChangeText={setReceiverPhone}
            />
          </View>
        </View>

        {/* Bagian 2: Alamat Tujuan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alamat Tujuan</Text>
          <TextInput
            style={[styles.input, styles.inputAddress]}
            placeholder="Patokan lokasi / catatan tambahan"
            multiline
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* Bagian 3: Tanggal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tanggal</Text>
          <View style={styles.dateRow}>
            <Text style={styles.dateText}>{currentDate}</Text>
            {/* Ikon kalender di sini (contoh) */}
            <Text style={styles.calendarIcon}>🗓️</Text>
          </View>
        </View>

        {/* Bagian 4: Card Informasi Teknisi */}
        <TechnicianInfoCard />

        {/* Bagian 5: Metode Pembayaran */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
          <PaymentOption
            label="Transfer Bank"
            isSelected={selectedPayment === 'Transfer Bank'}
            onPress={() => setSelectedPayment('Transfer Bank')}
          />
          <PaymentOption
            label="E-Wallet"
            isSelected={selectedPayment === 'E-Wallet'}
            onPress={() => setSelectedPayment('E-Wallet')}
          />
          <PaymentOption
            label="Bayar di Tempat"
            isSelected={selectedPayment === 'Bayar di Tempat'}
            onPress={() => setSelectedPayment('Bayar di Tempat')}
          />
        </View>
      </ScrollView>

      {/* Footer: Total dan Tombol Pesan */}
      <View style={styles.footerBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>Rp150.000</Text>
        </View>
        <TouchableOpacity style={styles.buttonCreateOrder}>
          <Text style={styles.buttonText}>Buat Pesanan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentPage;

// --- Styling ---

const styles = StyleSheet.create({
  // Struktur Dasar
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC', // Background umum
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Memberi ruang agar tidak tertutup footerBar
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B2559',
    marginBottom: 10,
  },

  // Header Bar
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingTop: 50, // Sesuaikan dengan notch/status bar
  },
  headerButton: {
    color: '#007AFF', // Warna khas iOS/link
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1B2559',
  },

  // Input & Form
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 14,
    color: '#1B2559',
  },
  inputHalf: {
    width: '48%',
  },
  inputAddress: {
    height: 70, // Lebih tinggi untuk alamat
    textAlignVertical: 'top',
  },

  // Date Row
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dateText: {
    fontSize: 14,
    color: '#1B2559',
  },
  calendarIcon: {
    fontSize: 20,
  },

  // Card Informasi Teknisi (Diambil dari OrderCard)
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    backgroundColor: '#D1FAE5', // Placeholder warna untuk gambar
  },
  infoCardContent: {
    flex: 1,
  },
  infoCardHeader: {
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
    marginVertical: 4,
  },
  role: {
    fontSize: 13,
    color: '#6B7280',
    marginRight: 8,
  },
  location: {
    fontSize: 13,
    fontWeight: '400',
    color: '#6B7280',
  },

  // Badge
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

  // Radio Buttons (Metode Pembayaran)
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A0AEC0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50', // Hijau solid untuk yang terpilih
  },
  radioLabel: {
    fontSize: 15,
    color: '#1B2559',
  },

  // Footer Bar (Total & Tombol)
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingBottom: 30, // Sesuaikan dengan safe area bawah
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B2559',
  },
  buttonCreateOrder: {
    backgroundColor: '#8BC34A', // Hijau dari desain
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
