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

// --- DATA DUMMY TEKNISI TEKNOLOGI ---
const dummyData = [
  {
    id: 1,
    name: 'Rizal Pratama',
    job: 'Teknisi WiFi & Internet Rumah',
    price: 'Mulai Rp 75.000 / kunjungan',
    image: require('../assets/Teknologya.png'),
  },
  {
    id: 2,
    name: 'Siska Aulia',
    job: 'Instalasi & Setting CCTV',
    price: 'Mulai Rp 120.000 / unit',
    image: require('../assets/Teknologya.png'),
  },
  {
    id: 3,
    name: 'Yusuf Hardiansyah',
    job: 'Service Laptop / PC (Software & Hardware)',
    price: 'Mulai Rp 80.000',
    image: require('../assets/Teknologya.png'),
  },
  {
    id: 4,
    name: 'Maya Putri',
    job: 'Home Smart Device Setup (Google Home, Alexa, dsb.)',
    price: 'Mulai Rp 50.000 / device',
    image: require('../assets/Teknologya.png'),
  },
  {
    id: 5,
    name: 'Dedi Saputra',
    job: 'Perbaikan Jaringan LAN & Router',
    price: 'Mulai Rp 60.000',
    image: require('../assets/Teknologya.png'),
  },
  {
    id: 6,
    name: 'Arif Nugraha',
    job: 'Teknisi TV, Home Theater & Display',
    price: 'Mulai Rp 90.000',
    image: require('../assets/Teknologya.png'),
  },
];

const HelpTekno = () => {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          Teknisi Teknologi Siap Datang ke Rumah Anda!
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

export default HelpTekno;

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
