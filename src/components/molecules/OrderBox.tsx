import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Rating = ({ rating = 5 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);
  return (
    <View style={styles.ratingContainer}>
      {stars.map((isFilled, index) => (
        <Image
          key={index}
          source={require('../../assets/Star.png')}
          style={styles.star}
        />
      ))}
    </View>
  );
};

const OrderBox = ({
  style,
  name,
  subtitle,
  image,
  price,
  location,
  category = 'Help Antar',
  skills = [],
  deliveries = 1,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <View style={styles.card}>
        <Image source={image} style={styles.image} />

        <View style={styles.detailsContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>

            <TouchableOpacity>
              <Image
                source={require('../../assets/emptyHeart.png')}
                style={styles.emptyHeart}
              />
            </TouchableOpacity>
          </View>

          {/* Rating */}
          <Rating />

          {/* Category */}
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>

          {/* Location */}
          <View style={styles.infoRow}>
            <Image
              source={require('../../assets/locationIcon.png')}
              style={styles.icon}
            />
            <Text style={styles.locationText}>{location}</Text>
          </View>

          {/* Skills */}
          <View style={{ marginTop: 10 }}>
            {skills.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <Image
                  source={require('../../assets/skill.png')}
                  style={{
                    width: 12,
                    height: 12,
                    resizeMode: 'contain',
                    marginRight: 5,
                  }}
                />
                <Text style={styles.skillText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.deliveriesText}>
              Jumlah pengantaran : {deliveries}
            </Text>

            <Text style={styles.priceText}>{price}</Text>

            <Text style={styles.includedText}>
              termasuk biaya jasa pengajar & transportasi
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 384,
    height: 240,
    borderRadius: 15,
    elevation: 7,
    padding: 10,
  },
  image: {
    width: 130,
    height: 210,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#202C60',
  },
  subtitle: {
    fontSize: 12,
    color: '#202C60',
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 2,
  },
  star: {
    width: 16,
    height: 17,
    marginRight: 3,
  },
  categoryContainer: {
    backgroundColor: '#B6CF7B',
    width: 85,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: -15,
    marginLeft: 100,
  },
  categoryText: {
    fontSize: 12,
    color: '#202C60',
    marginTop: -1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginRight: 5,
  },
  locationText: {
    fontSize: 12,
    color: '#202C60',
  },
  skillText: {
    fontSize: 12,
    color: '#202C60',
    flex: 1,
  },
  footer: {
    marginTop: 10,
    marginLeft: 75,
  },
  deliveriesText: {
    fontSize: 12,
    color: '#202C60',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#202C60',
    marginTop: 2,
    marginLeft: 3,
  },
  includedText: {
    fontSize: 10,
    color: '#202C60',
    opacity: 0.5,
  },
  emptyHeart: {
    width: 25,
    height: 25,
  },
});

export default OrderBox;
