import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import Header2 from '../components/molecules/Header2';
import SearchBar from '../components/molecules/SearchBar';
import OrderBox from '../components/molecules/OrderBox';
import BottomNav from '../components/molecules/BottomNav';

const Spacer = ({ height }) => <View style={{ height }} />;

const OrderScreen = () => {
  const [activeTab, setActiveTab] = useState('OrderScreen');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <Header2 />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <SearchBar style={styles.searchBar} />

          {/* ORDERBOX 1 */}
          <OrderBox
            style={styles.orderBox}
            name="Aditya Rahman"
            subtitle="Kurir Antar Barang"
            image={require('../assets/Kurir.png')}
            price="Rp 30.000"
            location="Manado & sekitarnya"
            category="Help Antar"
            deliveries={14}
            skills={['Packing Aman', 'Tracking Real-time']}
          />

          {/* ORDERBOX 2 */}
          <OrderBox
            style={styles.orderBox}
            name="Andi Prasetyo"
            subtitle="Teknisi AC & Kulkas"
            image={require('../assets/Teknisi.png')}
            price="Rp 150.000"
            location="Airmadidi & sekitarnya"
            category="Help Tekno"
            deliveries={32}
            skills={['Maintenance AC', 'Perbaikan Kulkas', 'Cuci AC']}
          />

          {/* ORDERBOX 3 */}
          <OrderBox
            style={styles.orderBox}
            name="Rina Kartika"
            subtitle="Tutor Matematika & Sains"
            image={require('../assets/Mentor.png')}
            price="Rp 200.000"
            location="Manado & sekitarnya"
            category="Help Pintar"
            deliveries={10}
            skills={['Matematika', 'Fisika', 'Metode Pemahaman Cepat']}
          />

          <Spacer height={25} />
        </View>
      </ScrollView>

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
    paddingBottom: 90,
  },
  searchBar: {
    marginTop: 5,
    alignSelf: 'center',
  },
  orderBox: {
    marginVertical: 5,
  },
});

export default OrderScreen;
