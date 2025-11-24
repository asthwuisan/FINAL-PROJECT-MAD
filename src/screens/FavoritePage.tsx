import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {OrderCardProps} from '../components/molecules/OrderCard';
import ListItemCard from '../components/molecules/OrderCard';
import Header from '../components/molecules/Header';
import {firebaseAuth, firebaseFirestore, collections} from '../config/firebaseConfig';
import {getImageFromIdentifier} from '../components/molecules/OrderBox';

interface FavoriteItem {
  id: string;
  serviceId: string;
  technicianName: string;
  technicianRole: string;
  technicianTag: string;
  technicianLocation: string;
  technicianPrice: string;
  imageIdentifier?: string;
  createdAt: any;
}

const FavoritePage = ({navigation}) => {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = firebaseAuth.currentUser;

  // Reload favorites whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (currentUser) {
        loadFavorites();
      } else {
        setLoading(false);
        setFavoriteItems([]);
      }
    }, [currentUser])
  );

  const loadFavorites = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log('Loading favorites for user:', currentUser.uid);
      const favoritesSnapshot = await firebaseFirestore
        .collection(collections.favorites)
        .where('userId', '==', currentUser.uid)
        .get();

      console.log('Favorites snapshot size:', favoritesSnapshot.size);

      const favorites: FavoriteItem[] = [];
      favoritesSnapshot.forEach(doc => {
        const data = doc.data();
        console.log('Favorite doc:', doc.id, data);
        favorites.push({
          id: doc.id,
          serviceId: data.serviceId || '',
          technicianName: data.technicianName || '',
          technicianRole: data.technicianRole || '',
          technicianTag: data.technicianTag || '',
          technicianLocation: data.technicianLocation || '',
          technicianPrice: data.technicianPrice || '',
          imageIdentifier: data.imageIdentifier || data.serviceId || '',
          createdAt: data.createdAt,
        });
      });

      // Sort by createdAt in descending order (newest first) in memory
      favorites.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
        return dateB.getTime() - dateA.getTime();
      });

      console.log('Loaded favorites count:', favorites.length);
      setFavoriteItems(favorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
      Alert.alert('Error', 'Gagal memuat favorit. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (favoriteId: string) => {
    if (!currentUser) return;

    try {
      await firebaseFirestore
        .collection(collections.favorites)
        .doc(favoriteId)
        .delete();

      // Update local state
      setFavoriteItems(prevItems => prevItems.filter(item => item.id !== favoriteId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleCardPress = (item: FavoriteItem) => {
    if (!navigation) return;

    // Get image from identifier
    const imageSource = getImageFromIdentifier(
      item.imageIdentifier || item.serviceId,
      item.serviceId
    );

    navigation.navigate('Payment', {
      technicianName: item.technicianName,
      technicianRole: item.technicianRole,
      technicianTag: item.technicianTag,
      technicianLocation: item.technicianLocation,
      technicianPrice: item.technicianPrice,
      technicianImage: imageSource,
    });
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Tanggal tidak tersedia';
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return `Disimpan pada ${date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}`;
    } catch {
      return 'Tanggal tidak tersedia';
    }
  };


  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Favorit" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8BC34A" />
        </View>
      </View>
    );
  }

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Header title="Favorit" />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Silakan login untuk melihat favorit</Text>
        </View>
      </View>
    );
  }

  if (favoriteItems.length === 0) {
    return (
      <View style={styles.container}>
        <Header title="Favorit" />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Belum ada item favorit</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Favorit" />
      <ScrollView>
        <View style={styles.listContainer}>
          {favoriteItems.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleCardPress(item)}
              activeOpacity={0.7}>
              <ListItemCard
                image={getImageFromIdentifier(item.imageIdentifier || item.serviceId, item.serviceId)}
                name={item.technicianName}
                role={item.technicianRole}
                tag={item.technicianTag}
                location={item.technicianLocation}
                price={item.technicianPrice}
                date={formatDate(item.createdAt)}
                isFavorite={true}
                onFavoriteToggle={() => handleRemoveFavorite(item.id)}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default FavoritePage;
