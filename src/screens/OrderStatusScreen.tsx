import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

export interface OrderStatusProps {
  navigation: any;
  route: {
    params: {
      orderId: string;
      technicianName: string;
      technicianRole: string;
      appointmentDateTime: string;
      status: string;
    };
  };
}

const OrderStatusScreen = ({ navigation, route }: OrderStatusProps) => {
  const {
    orderId,
    technicianName,
    technicianRole,
    appointmentDateTime,
    status,
  } = route.params;

  const getStatusInfo = () => {
    switch (status) {
      case 'accepted':
        return {
          title: 'Pesanan Diterima!',
          subtitle: 'Teknisi telah menerima pesanan Anda',
          statusColor: '#4CAF50',
          statusIcon: '✅',
          message: 'Teknisi akan tiba sesuai jadwal yang telah ditentukan.',
        };
      case 'on_way':
        return {
          title: 'Teknisi Dalam Perjalanan!',
          subtitle: 'Teknisi sedang menuju lokasi Anda',
          statusColor: '#FF9800',
          statusIcon: '🚗',
          message: 'Teknisi akan tiba sesuai jadwal.',
        };
      case 'arrived':
        return {
          title: 'Teknisi Telah Tiba!',
          subtitle: 'Teknisi telah tiba di lokasi',
          statusColor: '#2196F3',
          statusIcon: '🏠',
          message: 'Silakan persiapkan diri untuk pelayanan.',
        };
      default:
        return {
          title: 'Status Pesanan',
          subtitle: 'Pesanan sedang diproses',
          statusColor: '#9E9E9E',
          statusIcon: '⏳',
          message: 'Mohon tunggu konfirmasi dari teknisi.',
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Status Icon */}
        <View style={styles.iconContainer}>
          <View style={[styles.statusCircle, { backgroundColor: statusInfo.statusColor }]}>
            <Text style={styles.statusEmoji}>{statusInfo.statusIcon}</Text>
          </View>
        </View>

        {/* Status Message */}
        <Text style={styles.title}>{statusInfo.title}</Text>
        <Text style={styles.subtitle}>{statusInfo.subtitle}</Text>

        {/* Order Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Detail Pesanan</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ID Pesanan</Text>
            <Text style={styles.detailValue}>{orderId}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Teknisi</Text>
            <Text style={styles.detailValue}>{technicianName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Layanan</Text>
            <Text style={styles.detailValue}>{technicianRole}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Jadwal Kedatangan</Text>
            <Text style={styles.detailValue}>{appointmentDateTime}</Text>
          </View>
        </View>

        {/* Status Message */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {statusInfo.message}
          </Text>
        </View>

        {/* Contact Info */}
        {status === 'accepted' && (
          <View style={styles.contactCard}>
            <Text style={styles.contactTitle}>Informasi Kontak</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Nama Teknisi:</Text>
              <Text style={styles.contactValue}>{technicianName}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Layanan:</Text>
              <Text style={styles.contactValue}>{technicianRole}</Text>
            </View>
            <Text style={styles.contactNote}>
              Teknisi akan menghubungi Anda 30 menit sebelum jadwal kedatangan.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Beranda' })}>
          <Text style={styles.secondaryButtonText}>Kembali ke Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Tutup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderStatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 100,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  statusCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusEmoji: {
    fontSize: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B2559',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 40,
    textAlign: 'center',
  },
  detailsCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B2559',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#1B2559',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#1565C0',
    textAlign: 'center',
  },
  contactCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B2559',
    marginBottom: 15,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  contactLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  contactValue: {
    fontSize: 14,
    color: '#1B2559',
    fontWeight: '500',
  },
  contactNote: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#8BC34A',
    borderRadius: 10,
    paddingVertical: 14,
    marginLeft: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: '#8BC34A',
  },
  secondaryButtonText: {
    color: '#8BC34A',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

