import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import OrderCard, { OrderCardProps } from './OrderCard';

interface ListItemCardProps extends OrderCardProps {
  id: number;
}

const ListItemCard: React.FC<ListItemCardProps> = props => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.avatarContainer}>
        <Image source={props.image} style={styles.avatar} />
      </View>
      <OrderCard {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 24, // Spacing between items
    position: 'relative',
  },
  avatarContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 10,
    width: 75,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  avatar: {
    width: 75,
    height: 133,
    borderRadius: 8,
    resizeMode160: 'contain',
  },
});

export default ListItemCard;
