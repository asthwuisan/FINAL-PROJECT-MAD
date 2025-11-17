import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import Header from '../components/molecules/Header';
import SearchBar from '../components/molecules/SearchBar';
import Category from '../components/molecules/Category';
import BannerCard from '../components/atom/Banner';
import RecommendationSection from '../components/molecules/ReccomendationSection';
import BottomNav from '../components/molecules/BottomNav';

const Spacer = ({ height }) => <View style={{ height }} />;

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('home'); // tab aktif

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <SearchBar style={styles.searchBar} />
          <Category style={styles.category} />

          <Spacer height={25} />
          <BannerCard
            style={styles.banner}
            image={require('../assets/BannerCard.png')}
            onPress={() => console.log('Banner Pressed!')}
          />

          <RecommendationSection style={styles.recommendation} />
        </View>
      </ScrollView>

      {/* Bottom Nav di luar ScrollView agar selalu berada di bawah */}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
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
});

export default HomeScreen;
