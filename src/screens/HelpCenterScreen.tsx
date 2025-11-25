import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';

const helpTopics = [
  {
    title: 'Cara Memesan Layanan',
    description: 'Pelajari cara memesan layanan yang Anda butuhkan',
  },
  {
    title: 'Metode Pembayaran',
    description: 'Informasi tentang berbagai metode pembayaran yang tersedia',
  },
  {
    title: 'Status Pesanan',
    description: 'Cara melihat dan melacak status pesanan Anda',
  },
  {
    title: 'Pengembalian Dana',
    description: 'Kebijakan pengembalian dana dan refund',
  },
  {
    title: 'Kontak Support',
    description: 'Hubungi tim support kami untuk bantuan',
  },
];

const HelpCenterScreen = ({ navigation }: { navigation: any }) => {
  const handleContactSupport = () => {
    const phoneNumber = '+6281234567890'; // Replace with actual support number
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmailSupport = () => {
    const email = 'support@helpapp.com'; // Replace with actual support email
    Linking.openURL(`mailto:${email}?subject=Bantuan Pengguna`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pusat Bantuan</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pertanyaan Umum</Text>
        {helpTopics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            style={styles.topicItem}
            onPress={() => {
              // Here you could navigate to detailed help pages
              // For now, just show an alert
              Alert.alert('Informasi', `Informasi tentang: ${topic.title}`);
            }}
          >
            <Text style={styles.topicTitle}>{topic.title}</Text>
            <Text style={styles.topicDescription}>{topic.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Butuh Bantuan Lebih Lanjut?</Text>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleContactSupport}
        >
          <Text style={styles.contactButtonText}>📞 Hubungi Support</Text>
          <Text style={styles.contactButtonSubtext}>+62 812-3456-7890</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleEmailSupport}
        >
          <Text style={styles.contactButtonText}>✉️ Email Support</Text>
          <Text style={styles.contactButtonSubtext}>support@helpapp.com</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Kembali</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#111827',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
  },
  topicItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  contactButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  contactButtonSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  backButton: {
    backgroundColor: '#202C5F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HelpCenterScreen;
