import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export interface OrderCardProps {
  image: any;
  name: string;
  role: string;
  tag: string;
  location: string;
  price: string;
  date: string;
  isFavorite: boolean;
  onFavoriteToggle?: () => void;
}

const HelpBadge = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.badgeContainer}>
    <Text style={styles.badgeText}>{children}</Text>
  </View>
);

const HeartIcon = ({
  isFavorite,
  onPress,
}: {
  isFavorite: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.heartIconContainer}>
    <Image
      // Pilih gambar berdasarkan status isFavorite
      source={
        isFavorite
          ? require('../assets/love.png') // Ganti dengan gambar ikon favorit Anda
          : require('../assets/love.png')
      }
      style={[
        styles.heartIcon,
        // Terapkan gaya berbeda berdasarkan status isFavorite
        isFavorite ? styles.heartIconFavorite : styles.heartIconNotFavorite,
      ]}
    />
  </TouchableOpacity>
);

export const OrderCard = ({
  name,
  role,
  tag,
  location,
  price,
  date,
  isFavorite,
  onFavoriteToggle,
}: OrderCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.roleContainer}>
              <Text style={styles.role}>{role}</Text>
              <HelpBadge>{tag}</HelpBadge>
            </View>
          </View>
          <Text style={styles.price}>{price}</Text>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <HeartIcon isFavorite={isFavorite} onPress={onFavoriteToggle} />
        </View>
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 50, // Space for the overlapping avatar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    color: '#1B2559',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  role: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
    marginLeft: 20,
  },
  price: {
    fontSize: 16,
    color: '#1B2559',
    fontWeight: '600',
    marginLeft: -40,
  },
  footer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  location: {
    fontWeight: '600',
    marginLeft: 20,
  },
  date: {
    fontSize: 12,
    color: '#A0AEC0',
    marginLeft: 20,
  },
  badgeContainer: {
    backgroundColor: '#D1FAE5',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#065F46',
  },
  heartIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  heartIconFavorite: {
    // tintColor tidak lagi diperlukan karena kita menggunakan gambar yang berbeda
  },
  heartIconNotFavorite: {
    tintColor: '#A0AEC0',
    opacity: 0.7,
  },
});
