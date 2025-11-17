import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { OrderCardProps } from '../molecules/OrderCard';
import ListItemCard from '../molecules/ListItemCard';
import BottomNav from '../molecules/BottomNav';
import Header from '../molecules/Header';

interface ItemData extends Omit<OrderCardProps, 'onFavoriteToggle' | 'id'> {
  id: number;
}

const initialItems: ItemData[] = [
  {
    id: 1,
    image: require('../assets/teknisi.png'),
    name: 'Andi Yudho ',
    role: 'Teknisi AC & Kulkas',
    tag: 'Help Rumah',
    location: 'Manado',
    price: 'Rp 150.000',
    date: 'Disimpan pada 1 Oktober 2025',
    isFavorite: true,
  },
  {
    id: 2,
    image: require('../assets/kurir.png'),
    name: 'Aditya Rahman',
    role: 'Kurir Antar Barang',
    tag: 'Help Antar',
    location: 'Manado & Sekitarnya',
    price: 'Rp 30.000',
    date: 'Disimpan pada 10 Oktober 2025',
    isFavorite: true,
  },
];

const FavoritePage = () => {
  const [favoriteItems, setFavoriteItems] = useState(initialItems);

  const handleRemoveFavorite = (itemId: number) => {
    const updatedItems = favoriteItems.filter(item => item.id !== itemId);
    setFavoriteItems(updatedItems);
    console.log(`Item with id ${itemId} removed from favorites.`);
  };

  return (
    <View style={styles.container}>
      <Header title="Favorit" />
      <ScrollView>
        <View style={styles.listContainer}>
          {favoriteItems.map(item => (
            <ListItemCard
              key={item.id}
              {...item}
              onFavoriteToggle={() => handleRemoveFavorite(item.id)}
            />
          ))}
        </View>
      </ScrollView>
      <BottomNav active="Favorit" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  listContainer: {
    padding: 24,
  },
});

export default FavoritePage;
