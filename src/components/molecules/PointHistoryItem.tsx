import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Interface untuk data yang akan ditampilkan
interface PointHistoryItemProps {
  date: string;
  description: string;
  points: number;
  expiryDate: string;
  isCredit: boolean; // true jika poin bertambah (+), false jika berkurang (-)
}

const PointHistoryItem: React.FC<PointHistoryItemProps> = ({
  date,
  description,
  points,
  expiryDate,
  isCredit,
}) => {
  const pointsText = isCredit ? `+${points}` : `-${points}`;
  const pointsStyle = isCredit ? styles.pointsCredit : styles.pointsDebit;

  return (
    <View style={styles.container}>
      {/* Kolom Kiri: Tanggal */}
      <View style={styles.dateColumn}>
        <Text style={styles.dateText}>{date}</Text>
      </View>

      {/* Kolom Tengah: Deskripsi */}
      <View style={styles.descriptionColumn}>
        <Text style={styles.descriptionText}>{description}</Text>
        <Text style={styles.expiryText}>Kadaluarsa pada {expiryDate}</Text>
      </View>

      {/* Kolom Kanan: Poin */}
      <View style={styles.pointsColumn}>
        <Text style={[styles.pointsBase, pointsStyle]}>{pointsText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dateColumn: {
    width: 80, // Ukuran kolom tanggal agar konsisten
    marginRight: 10,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  descriptionColumn: {
    flex: 1, // Mengisi ruang yang tersisa
  },
  descriptionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 3,
  },
  expiryText: {
    fontSize: 12,
    color: '#888',
  },
  pointsColumn: {
    minWidth: 50,
    alignItems: 'flex-end', // Poin rata kanan
  },
  pointsBase: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointsCredit: {
    color: '#56AB2F', // Warna hijau untuk poin yang bertambah
  },
  pointsDebit: {
    color: '#FF4500', // Contoh warna merah untuk poin yang berkurang (jika ada)
  },
});

export default PointHistoryItem;
