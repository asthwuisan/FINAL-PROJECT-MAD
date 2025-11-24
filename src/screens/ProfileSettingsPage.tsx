import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { ProfileCard } from '../components/molecules/ProfileCard';
import { SettingsListItem } from '../components/molecules/SettingsListItem';
import { useUser } from '../context/UserContext';
import { firebaseAuth } from '../config/firebaseConfig';

const ProfileSettingsPage = ({ navigation }) => {
  const { user, loading } = useUser();

  const handleLogout = async () => {
    Alert.alert(
      'Keluar',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: async () => {
            try {
              await firebaseAuth.signOut();
              // Navigate to sign in screen
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
              });
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert('Error', 'Gagal keluar. Silakan coba lagi.');
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={[stylesPage.container, stylesPage.loadingContainer]}>
        <Text style={stylesPage.title}>Profile / Settings</Text>
        <ActivityIndicator size="large" color="#202C5F" />
        <Text style={stylesPage.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={stylesPage.container}>
      <Text style={stylesPage.title}>Profile / Settings</Text>

      <ProfileCard
        name={user?.name || 'User'}
        phone={user?.phone || user?.email || 'No phone number'}
      />

      <View style={stylesPage.listContainer}>
        <SettingsListItem label="Edit Profil" icon="person-circle-outline" />
        <SettingsListItem label="Metode Pembayaran" icon="card-outline" />
        <SettingsListItem label="Bahasa" icon="language-outline" />
        <SettingsListItem label="Pusat Bantuan" icon="help-circle-outline" />
        <SettingsListItem
          label="Keluar"
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
