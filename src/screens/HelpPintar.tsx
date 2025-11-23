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

// --- DATA DUMMY GURU LES ---
const dummyData = [
  {
    id: 1,
    name: 'Sarah Wibowo',
    job: 'Tutor Matematika (SMP/SMA)',
    price: 'Mulai Rp 50.000 / sesi',
    image: require('../assets/Mentor.png'),
  },
  {
    id: 2,
    name: 'Andi Pratama',
    job: 'Tutor Bahasa Inggris (Basic–Intermediate)',
    price: 'Mulai Rp 45.000 / sesi',
    image: require('../assets/Mentor.png'),
  },
  {
    id: 3,
    name: 'Monica Lestari',
    job: 'Tutor Fisika (SMA)',
    price: 'Mulai Rp 55.000 / sesi',
    image: require('../assets/Mentor.png'),
  },
  {
    id: 4,
    name: 'Rangga Mahendra',
    job: 'Tutor Kimia (SMA)',
    price: 'Mulai Rp 60.000 / sesi',
    image: require('../assets/Mentor.png'),
  },
  {
    id: 5,
    name: 'Dinda Ayu',
    job: 'Tutor Calistung (TK/SD)',
    price: 'Mulai Rp 35.000 / sesi',
    image: require('../assets/Mentor.png'),
  },
  {
    id: 6,
    name: 'Kevin Santoso',
    job: 'Tutor Privat UTBK / SBMPTN',
    price: 'Mulai Rp 80.000 / sesi',
    image: require('../assets/Mentor.png'),
  },
];

const HelpPintar = () => {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          Guru Les Privat Siap Datang ke Rumah Anda!
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

export default HelpPintar;

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
