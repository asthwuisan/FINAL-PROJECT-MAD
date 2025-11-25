import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { ProfileCard } from '../components/molecules/ProfileCard';
import { SettingsListItem } from '../components/molecules/SettingsListItem';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { firebaseAuth } from '../config/firebaseConfig';

const ProfileSettingsPage = ({ navigation }) => {
  const { user, loading } = useUser();
  const { t } = useLanguage();

  const handleLogout = async () => {
    Alert.alert(
      t('profile.logout'),
      t('profile.logoutConfirm'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.yes'),
          style: 'destructive',
          onPress: async () => {
            try {
              await firebaseAuth.signOut();
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
              });
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert(t('common.error'), t('profile.logoutError'));
            }
          },
        },
      ],
    );
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLanguage = () => {
    navigation.navigate('Language');
  };

  const handleHelpCenter = () => {
    navigation.navigate('HelpCenter');
  };

  if (loading) {
    return (
      <View style={[stylesPage.container, stylesPage.loadingContainer]}>
        <Text style={stylesPage.title}>{t('profile.title')}</Text>
        <ActivityIndicator size="large" color="#202C5F" />
        <Text style={stylesPage.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={stylesPage.container}>
      <Text style={stylesPage.title}>{t('profile.title')}</Text>

      <ProfileCard
        name={user?.name || 'User'}
        phone={user?.phone || user?.email || 'No phone number'}
      />

      <View style={stylesPage.listContainer}>
        <SettingsListItem
          label={t('profile.editProfile')}
          icon="person-circle-outline"
          onPress={handleEditProfile}
        />
        <SettingsListItem
          label={t('profile.language')}
          icon="language-outline"
          onPress={handleLanguage}
        />
        <SettingsListItem
          label={t('profile.helpCenter')}
          icon="help-circle-outline"
          onPress={handleHelpCenter}
        />
        <SettingsListItem
          label={t('profile.logout')}
          icon="log-out-outline"
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
};

const stylesPage = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6B7280',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },
  listContainer: {
    marginTop: 10,
  },
});

export default ProfileSettingsPage;
