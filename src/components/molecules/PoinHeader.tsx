import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PointHeader: React.FC = () => {
  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={['#A8E063', '#56AB2F']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradient}>
        <View style={styles.content}>
          <Text style={styles.title}>HelpYu Points</Text>

          <View style={styles.pointRow}>
            <Image
              source={require('../../assets/koin.png')}
              style={styles.icon}
            />
            <Text style={styles.points}>80</Text>
          </View>

          <Text style={styles.subtitle}>1 HelpYu Points = Rp1</Text>

          <Text style={styles.expiryText}>
            300 Points-mu kadaluarsa pada 01 Nov 2026
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 5,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 60,
    height: 60,
    marginTop: 20,
  },
  points: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 15,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 10,
  },
  expiryText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default PointHeader;
