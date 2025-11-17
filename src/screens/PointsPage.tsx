import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text } from 'react-native';
import PointHeader from '../components/PointHeader';
import PointHistoryItem from '../components/PointHistoryItem';

// Definisikan tipe data untuk riwayat
interface HistoryData {
  id: number;
  date: string;
  description: string;
  points: number;
  expiryDate: string;
  isCredit: boolean;
}

// Data dummy untuk riwayat transaksi
const historyData: HistoryData[] = [
  {
    id: 1,
    date: '3 Sept 2025',
    description: 'Transaksi Help Rumah Berhasil',
    points: 50,
    expiryDate: '01 Nov 2026',
    isCredit: true,
  },
  {
    id: 2,
    date: '10 Sept 2025',
    description: 'Mengundang teman baru',
    points: 100,
    expiryDate: '10 Nov 2026',
    isCredit: true,
  },
  {
    id: 3,
    date: '01 Nov 2025',
    description: 'Aktif 7 hari berturut-turut',
    points: 30,
    expiryDate: '01 Des 2026',
    isCredit: true,
  },
  // Anda bisa menambahkan data lain di sini
];

const PointsPage: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* 1. Header Poin */}
        <PoinHeader />

        {/* 2. Riwayat Poin */}
        <View style={styles.historySection}>
          {historyData.map(item => (
            <PointHistoryItem
              key={item.id}
              date={item.date}
              description={item.description}
              points={item.points}
              expiryDate={item.expiryDate}
              isCredit={item.isCredit}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Latar belakang putih
  },
  container: {
    flex: 1,
  },
  historySection: {
    marginTop: 10,
    // Garis pemisah di setiap item sudah diatur di PointHistoryItem
  },
});

export default PointsPage;
