import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NotificationScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notifikasi</Text>
      
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Belum ada notifikasi</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default NotificationScreen;
