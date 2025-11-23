import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/molecules/Header';

// --- DATA DUMMY KURIR ---
const dummyData = [
  {
    id: 1,
    name: 'Bambang Sutejo',
    job: 'Kurir Motor (Standard)',
    price: 'Mulai Rp 15.000',
    image: require('../assets/Kurir1.jpg'),
  },
  {
    id: 2,
    name: 'Citra Kirana',
    job: 'Kurir Mobil (Cargo)',
    price: 'Mulai Rp 50.000',
    image: require('../assets/Kurir1.jpg'),
  },
  {
    id: 3,
    name: 'Eko Handoko',
    job: 'Kurir Sepeda (Ramah Lingkungan)',
    price: 'Mulai Rp 10.000',
    image: require('../assets/Kurir1.jpg'),
  },
  {
    id: 4,
    name: 'Tuti Maryati',
    job: 'Kurir Instan',
    price: 'Mulai Rp 25.000',
    image: require('../assets/Kurir1.jpg'),
  },
  {
    id: 5,
    name: 'Hadi Wijaya',
    job: 'Kurir Makanan/Minuman',
    price: 'Mulai Rp 12.000',
    image: require('../assets/Kurir1.jpg'),
  },
  {
    id: 6,
    name: 'Joko Susilo',
    job: 'Kurir Jarak Jauh',
    price: 'Hubungi untuk harga',
    image: require('../assets/Kurir1.jpg'),
  },
];

const HelpAntar = () => {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          Layanan Kurir Siap Antar Pesanan Anda!
        </Text>

        <View style={styles.grid}>
          {dummyData.map(item => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <Image source={item.image} style={styles.image} />

              <View style={styles.infoBox}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.job}>{item.job}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpAntar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 12,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  infoBox: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  job: {
    fontSize: 12,
    color: '#5C5C5C',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#202C5F',
    marginTop: 6,
  },
});