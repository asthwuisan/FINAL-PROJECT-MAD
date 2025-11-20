import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {ProfileCard} from '../components/molecules/ProfileCard';
import {SettingsListItem} from '../components/molecules/SettingsListItem';

const ProfileSettingsPage = ({navigation}) => {
  return (
    <ScrollView style={stylesPage.container}>
      <Text style={stylesPage.title}>Profile / Settings</Text>

      <ProfileCard name="Bianca ABC" phone="+62-787-478" />

      <View style={stylesPage.listContainer}>
        <SettingsListItem label="Edit Profil" icon="person-circle-outline" />
        <SettingsListItem label="Metode Pembayaran" icon="card-outline" />
        <SettingsListItem label="Bahasa" icon="language-outline" />
        <SettingsListItem label="Pusat Bantuan" icon="help-circle-outline" />
        <SettingsListItem label="Keluar" icon="exit-outline" />
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
