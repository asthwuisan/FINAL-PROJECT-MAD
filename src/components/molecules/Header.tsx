import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#080000ff" />
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      {/* Left side: Logo and Welcome Text */}
      <View style={styles.leftContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>Hai, Asthried!</Text>
          <Text style={styles.prompt}>Mau dibantu apa hari ini?</Text>
        </View>
      </View>

      {/* Right side: Icons */}
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../../assets/NotifIcon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../../assets/ProfileIcon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 1,
    backgroundColor: '#000000ff',
    backgroundColor: '#FAFAFA',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  textContainer: {
    marginLeft: -95,
    marginTop: 70, // Overlap with logo slightly
  },
  greeting: { fontSize: 16, color: '#202C5F', fontWeight: 'bold' },
  prompt: { fontSize: 16, color: '#202C5F' },
  rightContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  icon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
});

export default Header;
