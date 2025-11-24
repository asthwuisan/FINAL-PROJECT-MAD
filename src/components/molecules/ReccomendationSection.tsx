import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Rekom1 from '../../assets/rekom1.png';
import Rekom2 from '../../assets/rekom2.png';
import Rekom3 from '../../assets/rekom3.png';
import Rekom4 from '../../assets/rekom4.png';
import Rekom5 from '../../assets/rekom5.png';
import Rekom6 from '../../assets/rekom6.png';

const RecommendationSection = () => {
  const dataRekom = [
    { image: Rekom1, title: 'AC Service', subtitle: 'Mulai dari Rp50.000' },
    { image: Rekom2, title: 'Belajar Privat', subtitle: 'Mulai dari Rp85.000' },
    { image: Rekom3, title: 'Kurir Express', subtitle: 'Free Antar Jemput' },
    { image: Rekom4, title: 'Diskon 20%', subtitle: 'Promo Spesial' },
    {
      image: Rekom5,
      title: 'Cleaning Service',
      subtitle: 'Rumah Bersih Segar',
    },
    { image: Rekom6, title: 'Rental Mobil', subtitle: 'Mulai Rp250.000/hari' },
  ];

  return (
    <View style={[styles.wrapper, { marginTop: 20, marginBottom: 100 }]}>
      <Text style={styles.heading}>Rekomendasi Untukmu</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {dataRekom.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card}>
              <Image source={item.image} style={styles.image} />

              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RecommendationSection;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    marginTop: 1,
    marginButton: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Biar jadi grid
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 245,
    weight: 118,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
});
