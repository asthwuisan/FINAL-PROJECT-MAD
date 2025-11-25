import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  navigation?: any;
  title?: string;
}

const Header = ({ navigation, title }: HeaderProps) => {
  const { user, loading } = useUser();
  const { t } = useLanguage();

  // Get first name from full name
  const getFirstName = (fullName: string | undefined) => {
    if (!fullName) return 'Guest';
    return fullName.split(' ')[0];
  };

  // Handler for notification icon
  const handleNotificationPress = () => {
    if (navigation) {
      navigation.navigate('Notification');
    }
  };

  // Handler for profile icon
  const handleProfilePress = () => {
    if (navigation) {
      navigation.navigate('Saya');
    }
  };

  // If title is provided, render a simple title header
  if (title) {
    return (
      <View style={styles.titleHeaderContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
        <View style={styles.titleHeaderContent}>
          <Text style={styles.titleHeaderText}>{title}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      {/* Left side: Logo and Welcome Text */}
      <View style={styles.leftContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <View style={styles.textContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#202C5F" />
          ) : (
            <>
              <Text style={styles.greeting}>
                {t('home.greeting').replace('{{name}}', getFirstName(user?.name))}
              </Text>
              <Text style={styles.prompt}>{t('home.prompt')}</Text>
            </>
          )}
        </View>
      </View>

      {/* Right side: Icons */}
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleNotificationPress}
        >
          <Image
            source={require('../../assets/NotifIcon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleProfilePress}
        >
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
  titleHeaderContainer: {
    backgroundColor: '#FAFAFA',
    paddingTop: 50,
    paddingBottom: 15,
    elevation: 2,
  },
  titleHeaderContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202C5F',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 1,
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
