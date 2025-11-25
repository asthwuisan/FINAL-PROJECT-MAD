import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Text,
} from 'react-native';

import Header from '../components/molecules/Header';
import SearchBar from '../components/molecules/SearchBar';
import Category from '../components/molecules/Category';
import BannerCard from '../components/atom/Banner';
import RecommendationSection from '../components/molecules/ReccomendationSection';
import { useLanguage } from '../context/LanguageContext';

const Spacer = ({ height }: { height: number }) => <View style={{ height }} />;

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Define all available data
  const allCategories = [
    { name: 'Help Rumah', source: require('../assets/HelpRumah.png'), screen: 'HelpRumah' },
    { name: 'Help Antar', source: require('../assets/HelpAntar.png'), screen: 'HelpAntar' },
    { name: 'Help Pintar', source: require('../assets/HelpPintar.png'), screen: 'HelpPintar' },
    { name: 'Help Tekno', source: require('../assets/HelpTekno.png'), screen: 'HelpTekno' },
  ];

  const allRecommendations = [
    { image: require('../assets/rekom1.png'), title: 'AC Service', subtitle: 'Mulai dari Rp50.000' },
    { image: require('../assets/rekom2.png'), title: 'Belajar Privat', subtitle: 'Mulai dari Rp85.000' },
    { image: require('../assets/rekom3.png'), title: 'Kurir Express', subtitle: 'Free Antar Jemput' },
    { image: require('../assets/rekom4.png'), title: 'Diskon 20%', subtitle: 'Promo Spesial' },
    {
      image: require('../assets/rekom5.png'),
      title: 'Cleaning Service',
      subtitle: 'Rumah Bersih Segar',
    },
    { image: require('../assets/rekom6.png'), title: 'Rental Mobil', subtitle: 'Mulai Rp250.000/hari' },
  ];

  // Filter data based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return allCategories;
    return allCategories.filter(category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredRecommendations = useMemo(() => {
    if (!searchQuery.trim()) return allRecommendations;
    return allRecommendations.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <Header navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <SearchBar
            style={styles.searchBar}
            onChangeText={handleSearch}
            placeholder={t('home.searchPlaceholder')}
          />

          {/* Only show categories if search query is empty or there are filtered results */}
          {(!searchQuery.trim() || filteredCategories.length > 0) && (
            <Category
              style={styles.category}
              navigation={navigation}
              categories={filteredCategories}
            />
          )}

          <Spacer height={25} />
          <BannerCard
            style={styles.banner}
            image={require('../assets/BannerCard.png')}
            onPress={() => console.log('Banner Pressed!')}
          />

          {/* Only show recommendations if search query is empty or there are filtered results */}
          {(!searchQuery.trim() || filteredRecommendations.length > 0) && (
            <RecommendationSection
              style={styles.recommendation}
              recommendations={filteredRecommendations}
            />
          )}

          {/* Show no results message when search has results but no matches */}
          {searchQuery.trim() && filteredCategories.length === 0 && filteredRecommendations.length === 0 && (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>Tidak ada hasil untuk "{searchQuery}"</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Nav di luar ScrollView agar selalu berada di bawah */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    paddingBottom: 90, // beri ruang agar tidak tertutup bottom nav
  },
  searchBar: {
    marginTop: 5,
  },
  category: {
    marginTop: 10,
  },
  banner: {
    marginTop: 40,
  },
  recommendation: {
    marginTop: 25,
    marginHorizontal: 15,
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

export default HomeScreen;
