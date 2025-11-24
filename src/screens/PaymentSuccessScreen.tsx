import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';

export interface PaymentSuccessProps {
    navigation: any;
    route: {
        params: {
            orderId: string;
            technicianName: string;
            technicianRole: string;
            totalPrice: string;
            date: string;
            paymentMethod: string;
        };
    };
}

const PaymentSuccessScreen = ({ navigation, route }: PaymentSuccessProps) => {
    const {
        orderId,
        technicianName,
        technicianRole,
        totalPrice,
        date,
        paymentMethod,
    } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Success Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.successCircle}>
                        <Text style={styles.checkmark}>✓</Text>
                    </View>
                </View>

                {/* Success Message */}
                <Text style={styles.title}>Pembayaran Berhasil!</Text>
                <Text style={styles.subtitle}>
                    Pesanan Anda telah dikonfirmasi
                </Text>

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
                        <Text style={styles.detailLabel}>Tanggal</Text>
                        <Text style={styles.detailValue}>{date}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Metode Pembayaran</Text>
                        <Text style={styles.detailValue}>{paymentMethod}</Text>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.detailRow}>
                        <Text style={styles.totalLabel}>Total Pembayaran</Text>
                        <Text style={styles.totalValue}>{totalPrice}</Text>
                    </View>
                </View>

                {/* Info Message */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        📱 Anda akan menerima notifikasi ketika teknisi dalam perjalanan
                    </Text>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate('Pesan')}>
                    <Text style={styles.secondaryButtonText}>Lihat Pesanan</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('MainTabs', { screen: 'Beranda' })}>
                    <Text style={styles.primaryButtonText}>Kembali ke Beranda</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PaymentSuccessScreen;

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
    successCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        fontSize: 60,
        color: '#fff',
        fontWeight: 'bold',
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
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1B2559',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4CAF50',
    },
    infoBox: {
        width: '100%',
        backgroundColor: '#E3F2FD',
        borderRadius: 12,
        padding: 15,
        marginTop: 10,
    },
    infoText: {
        fontSize: 14,
        color: '#1565C0',
        textAlign: 'center',
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
