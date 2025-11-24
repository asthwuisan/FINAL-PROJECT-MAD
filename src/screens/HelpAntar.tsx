import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Header from '../components/molecules/Header';

const dummyData = [
    {
        id: 1,
        name: 'Budi Santoso',
        job: 'Kurir Motor',
        price: 'Rp 25.000',
        image: require('../assets/TeknisiSanitasi.png'),
    },
    {
        id: 2,
        name: 'Agus Wijaya',
        job: 'Driver Mobil',
        price: 'Rp 50.000',
        image: require('../assets/TukangPasangKeramik.png'),
    },
    {
        id: 3,
        name: 'Rina Susanti',
        job: 'Jasa Antar Makanan',
        price: 'Rp 15.000',
        image: require('../assets/CleaningService.png'),
    },
    {
        id: 4,
        name: 'Hendra Kurnia',
        job: 'Pesan Antar Barang',
        price: 'Rp 30.000',
        image: require('../assets/ChefPribadi.png'),
    },
];

const HelpAntar = ({ navigation }: { navigation: any }) => {
    const handleServicePress = (item: typeof dummyData[0]) => {
        navigation.navigate('Payment', {
            technicianName: item.name,
            technicianRole: item.job,
            technicianTag: 'Help Antar',
            technicianLocation: 'Jakarta',
            technicianPrice: item.price,
            technicianImage: item.image,
        });
    };

    return (
        <View style={styles.container}>
            <Header />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>
                    Help Antar siap antar kebutuhan mu!
                </Text>

                <View style={styles.grid}>
                    {dummyData.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            onPress={() => handleServicePress(item)}>
                            <Image source={item.image} style={styles.image} />

                            <View style={styles.infoBox}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.job}>{item.job}</Text>
                                <Text style={styles.price}>{item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default HelpAntar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6F9',
    },
    title: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: '600',
        color: '#2D2D2D',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 12,
    },
    card: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
    },
    infoBox: {
        padding: 10,
    },
    name: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000',
    },
    job: {
        fontSize: 12,
        color: '#5C5C5C',
        marginTop: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: '700',
        color: '#202C5F',
        marginTop: 6,
    },
});
