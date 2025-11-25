import React, {useState, useMemo} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Text,
} from 'react-native';

import Header2 from '../components/molecules/Header2';
import SearchBar from '../components/molecules/SearchBar';
import OrderBox from '../components/molecules/OrderBox';
import { useLanguage } from '../context/LanguageContext';

const Spacer = ({height}: {height: number}) => <View style={{height}} />;

const OrderScreen = ({navigation}: {navigation: any}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Define all available services
  const allServices = [
    {
      name: "Aditya Rahman",
      subtitle: "Kurir Antar Barang",
      image: require('../assets/Kurir.png'),
      price: "Rp 30.000",
      location: "Manado & sekitarnya",
      category: "Help Antar",
      deliveries: 14,
      skills: ['Packing Aman', 'Tracking Real-time'],
      serviceId: "aditya_rahman_kurir"
    },
    {
      name: "Andi Prasetyo",
      subtitle: "Teknisi AC & Kulkas",
      image: require('../assets/Teknisi.png'),
      price: "Rp 150.000",
      location: "Airmadidi & sekitarnya",
      category: "Help Tekno",
      deliveries: 32,
      skills: ['Maintenance AC', 'Perbaikan Kulkas', 'Cuci AC'],
      serviceId: "andi_prasetyo_teknisi"
    },
    {
      name: "Rina Kartika",
      subtitle: "Tutor Matematika & Sains",
      image: require('../assets/Mentor.png'),
      price: "Rp 200.000",
      location: "Manado & sekitarnya",
      category: "Help Pintar",
      deliveries: 10,
      skills: ['Matematika', 'Fisika', 'Metode Pemahaman Cepat'],
      serviceId: "rina_kartika_tutor"
    }
  ];

  // Filter services based on search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return allServices;
    const query = searchQuery.toLowerCase();
    return allServices.filter(service =>
      service.name.toLowerCase().includes(query) ||
      service.subtitle.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query) ||
      service.location.toLowerCase().includes(query) ||
      service.skills.some(skill => skill.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <Header2 />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <SearchBar
            style={styles.searchBar}
            placeholder={t('home.searchPlaceholder')}
            onChangeText={handleSearch}
          />

          {/* Render filtered services */}
          {filteredServices.map((service, index) => (
            <OrderBox
              key={service.serviceId}
              style={styles.orderBox}
              name={service.name}
              subtitle={service.subtitle}
              image={service.image}
              price={service.price}
              location={service.location}
              category={service.category}
              deliveries={service.deliveries}
              skills={service.skills}
              navigation={navigation}
              serviceId={service.serviceId}
            />
          ))}

          {/* Show no results message when search has results but no matches */}
          {searchQuery.trim() && filteredServices.length === 0 && (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>Tidak ada hasil untuk "{searchQuery}"</Text>
            </View>
          )}

          <Spacer height={25} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    paddingBottom: 90,
  },
  searchBar: {
    marginTop: 5,
    alignSelf: 'center',
  },
  orderBox: {
    marginVertical: 5,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    marginHorizontal: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default OrderScreen;
