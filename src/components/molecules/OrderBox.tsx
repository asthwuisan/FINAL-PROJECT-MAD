import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  firebaseAuth,
  firebaseFirestore,
  collections,
} from '../../config/firebaseConfig';

// Helper function to get image identifier from image source
const getImageIdentifier = (image: any): string => {
  // Try to extract identifier from serviceId or use a default mapping
  // This is a simplified approach - you may need to adjust based on your image structure
  if (typeof image === 'number') {
    // If it's a require() result, we can't easily extract the path
    // So we'll use serviceId or name to determine the image
    return 'default';
  }
  return String(image);
};

// Helper function to get image source from identifier
export const getImageFromIdentifier = (
  identifier: string,
  serviceId?: string,
): any => {
  // Map based on specific serviceId
  if (serviceId) {
    // Help Antar services
    if (serviceId === 'aditya_rahman_kurir') {
      return require('../../assets/Kurir.png');
    } else if (serviceId === 'budi_santoso_kurir_motor') {
      return require('../../assets/kurirMotor.png');
    } else if (serviceId === 'agus_wijaya_driver') {
      return require('../../assets/driver.png');
    } else if (serviceId === 'rina_susanti_kurir_makanan') {
      return require('../../assets/kurirMakanan.png');
    } else if (serviceId === 'hendra_kurnia_pesan_antar') {
      return require('../../assets/pesanAntar.png');
    }

    // Help Rumah services
    else if (serviceId === 'dimas_nugroho_teknisi') {
      return require('../../assets/TeknisiSanitasi.png');
    } else if (serviceId === 'fajar_wahyudi_tukang') {
      return require('../../assets/TukangPasangKeramik.png');
    } else if (serviceId === 'dewi_oktaviani_cleaning') {
      return require('../../assets/CleaningService.png');
    } else if (serviceId === 'rina_marlina_chef') {
      return require('../../assets/ChefPribadi.png');
    } else if (serviceId === 'siti_rahma_titip_belanja') {
      return require('../../assets/TukangBelanja.png');
    }

    // Help Pintar services
    else if (serviceId === 'rina_kartika_tutor') {
      return require('../../assets/Mentor.png');
    } else if (serviceId === 'siti_aminah_guru') {
      return require('../../assets/guruMath.png');
    } else if (serviceId === 'ahmad_dahlan_guru') {
      return require('../../assets/guruBing.png');
    } else if (serviceId === 'rina_kusuma_tutor') {
      return require('../../assets/guruFisika.png');
    } else if (serviceId === 'bambang_sutrisno_tutor') {
      return require('../../assets/guruMusik.png');
    }

    // Help Tekno services
    else if (serviceId === 'andi_prasetyo_teknisi') {
      return require('../../assets/Teknisi.png');
    } else if (serviceId === 'rudi_hartono_teknisi') {
      return require('../../assets/computerTechnician.png');
    } else if (serviceId === 'eka_prasetya_teknisi') {
      return require('../../assets/phoneTechnician.png');
    } else if (serviceId === 'deni_ramadhan_teknisi') {
      return require('../../assets/networkTechnician.png');
    } else if (serviceId === 'wawan_setiawan_teknisi') {
      return require('../../assets/laptopTechnician.png');
    }
  }

  // Fallback to default
  return require('../../assets/Teknisi.png');
};

const Rating = ({rating = 5}) => {
  const stars = Array.from({length: 5}, (_, i) => i < rating);
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

interface OrderBoxProps {
  style?: any;
  name: string;
  subtitle: string;
  image: any;
  price: string;
  location: string;
  category?: string;
  skills?: string[];
  deliveries?: number;
  navigation?: any;
  serviceId?: string; // Unique identifier for the service
}

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
  navigation,
  serviceId,
}: OrderBoxProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const currentUser = firebaseAuth.currentUser;

  // Load favorite status on mount
  useEffect(() => {
    if (currentUser && serviceId) {
      checkFavoriteStatus();
    }
  }, [currentUser, serviceId]);

  const checkFavoriteStatus = async () => {
    if (!currentUser || !serviceId) return;

    try {
      const favoriteDoc = await firebaseFirestore
        .collection(collections.favorites)
        .doc(`${currentUser.uid}_${serviceId}`)
        .get();

      setIsFavorite(favoriteDoc.exists);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleCardPress = () => {
    if (!navigation) return;

    // Map category to technicianTag
    const technicianTag = category;

    navigation.navigate('Payment', {
      technicianName: name,
      technicianRole: subtitle,
      technicianTag: technicianTag,
      technicianLocation: location,
      technicianPrice: price,
      technicianImage: image,
    });
  };

  const handleFavoriteToggle = async (e: any) => {
    e.stopPropagation(); // Prevent card press when clicking heart

    if (!currentUser) {
      Alert.alert(
        'Login Diperlukan',
        'Silakan login untuk menambahkan ke favorit.',
      );
      if (navigation) {
        navigation.navigate('SignIn');
      }
      return;
    }

    if (!serviceId) {
      console.warn('Service ID is required for favorites');
      return;
    }

    const favoriteId = `${currentUser.uid}_${serviceId}`;

    try {
      if (isFavorite) {
        // Remove from favorites
        await firebaseFirestore
          .collection(collections.favorites)
          .doc(favoriteId)
          .delete();
        setIsFavorite(false);
      } else {
        // Add to favorites
        // Store serviceId as image identifier since we can map it back
        const favoriteData = {
          userId: currentUser.uid,
          serviceId: serviceId,
          technicianName: name,
          technicianRole: subtitle,
          technicianTag: category,
          technicianLocation: location,
          technicianPrice: price,
          imageIdentifier: serviceId, // Use serviceId to identify the image
          createdAt: new Date(),
        };

        console.log('Adding favorite:', favoriteId, favoriteData);
        await firebaseFirestore
          .collection(collections.favorites)
          .doc(favoriteId)
          .set(favoriteData);
        console.log('Favorite added successfully');
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Gagal mengubah status favorit.');
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handleCardPress}
      activeOpacity={0.7}>
      <View style={styles.card}>
        <Image source={image} style={styles.image} />

        <View style={styles.detailsContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>

            <TouchableOpacity onPress={handleFavoriteToggle}>
              <Image
                source={
                  isFavorite
                    ? require('../../assets/heart.png')
                    : require('../../assets/emptyHeart.png')
                }
                style={[styles.emptyHeart, isFavorite && styles.filledHeart]}
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
          <View style={{marginTop: 10}}>
            {skills.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 4,
                }}>
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
              termasuk biaya jasa & transportasi
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
    // resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 15,
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
  filledHeart: {
    tintColor: '#FF6B6B', // Red color for filled heart
  },
});

export default OrderBox;
