import React, {useState, useMemo} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';

import Header2 from '../components/molecules/Header2';
import SearchBar from '../components/molecules/SearchBar';
import OrderBox from '../components/molecules/OrderBox';
import {useLanguage} from '../context/LanguageContext';

const Spacer = ({height}: {height: number}) => <View style={{height}} />;

const OrderScreen = ({navigation}: {navigation: any}) => {
  const {t} = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Define all available services
  const allServices = [
    {
      name: 'Aditya Rahman',
      subtitle: 'Kurir Antar Barang',
      image: require('../assets/Kurir.png'),
      price: 'Rp 30.000',
      location: 'Manado & sekitarnya',
      category: 'Help Antar',
      deliveries: 14,
      skills: ['Packing Aman', 'Tracking Real-time'],
      serviceId: 'aditya_rahman_kurir',
    },
    {
      name: 'Andi Prasetyo',
      subtitle: 'Teknisi AC & Kulkas',
      image: require('../assets/Teknisi.png'),
      price: 'Rp 150.000',
      location: 'Airmadidi & sekitarnya',
      category: 'Help Tekno',
      deliveries: 32,
      skills: ['Maintenance AC', 'Perbaikan Kulkas', 'Cuci AC'],
      serviceId: 'andi_prasetyo_teknisi',
    },
    {
      name: 'Rina Kartika',
      subtitle: 'Tutor Matematika & Sains',
      image: require('../assets/Mentor.png'),
      price: 'Rp 200.000',
      location: 'Manado & sekitarnya',
      category: 'Help Pintar',
      deliveries: 10,
      skills: ['Matematika', 'Fisika', 'Metode Pemahaman Cepat'],
      serviceId: 'rina_kartika_tutor',
    },
    {
      name: 'Dimas Nugroho',
      subtitle: 'Teknisi Sanitasi',
      image: require('../assets/TeknisiSanitasi.png'),
      price: 'Rp 100.000',
      location: 'Manado & sekitarnya',
      category: 'Help Rumah',
      deliveries: 15,
      skills: [
        'Penyemprotan anti virus", "Penyemprotan anti DBD", "Perbaikan Pipa Bocor',
      ],
      serviceId: 'dimas_nugroho_teknisi',
    },
    {
      name: 'Fajar Wahyudi',
      subtitle: 'Tukang Pasang Keramik',
      image: require('../assets/TukangPasangKeramik.png'),
      price: 'Rp 300.000',
      location: 'Manado & sekitarnya',
      category: 'Help Rumah',
      deliveries: 30,
      skills: [
        'Pasang Keramik Lantai',
        'Pasang Keramik Dinding',
        'Perbaikan Keramik Pecah',
      ],
      serviceId: 'fajar_wahyudi_tukang',
    },
    {
      name: 'Dewi Oktaviani',
      subtitle: 'Cleaning Service',
      image: require('../assets/CleaningService.png'),
      price: 'Rp 175.000',
      location: 'Manado & sekitarnya',
      category: 'Help Rumah',
      deliveries: 40,
      skills: ['Sapu & Pel Lantai', 'Deep Cleaning Kamar', 'Setrika Pakaian'],
      serviceId: 'dewi_oktaviani_cleaning',
    },
    {
      name: 'Rina Marlina',
      subtitle: 'Chef Pribadi',
      image: require('../assets/ChefPribadi.png'),
      price: 'Rp 200.000',
      location: 'Manado & sekitarnya',
      category: 'Help Rumah',
      deliveries: 50,
      skills: [
        'Masakan Nusantara',
        'Western & Asian Food',
        'Menu Sehat & Diet',
      ],
      serviceId: 'rina_marlina_chef',
    },
    {
      name: 'Siti Rahma',
      subtitle: 'Jasa Titip Belanja harian',
      image: require('../assets/TukangBelanja.png'),
      price: 'Rp 50.000',
      location: 'Manado & sekitarnya',
      category: 'Help Rumah',
      deliveries: 50,
      skills: [
        'Pilih Sayur & Buah Segar',
        'Belanja Grosir/Bulanan',
        'Tawar Menawar Pasar',
      ],
      serviceId: 'siti_rahma_titip_belanja',
    },
    {
      name: 'Budi Santoso',
      subtitle: 'Kurir Motor',
      image: require('../assets/kurirMotor.png'),
      price: 'Rp 25.000',
      location: 'Manado & sekitarnya',
      category: 'Help Antar',
      deliveries: 30,
      skills: [
        'Antar Dokumen Kilat',
        'Hafal Jalan Tikus',
        'Bawa Barang Hati-hati',
      ],
      serviceId: 'budi_santoso_kurir_motor',
    },
    {
      name: 'Agus Wijaya',
      subtitle: 'Driver Mobil',
      image: require('../assets/driver.png'),
      price: 'Rp 50.000',
      location: 'Manado & sekitarnya',
      category: 'Help Antar',
      deliveries: 35,
      skills: [
        'Antar Jemput Bandara',
        'Perjalanan Luar Kota',
        'Mobil Bersih & Wangi',
      ],
      serviceId: 'agus_wijaya_driver',
    },
    {
      name: 'Rina Susanti',
      subtitle: 'Jasa Antar Makanan',
      image: require('../assets/kurirMakanan.png'),
      price: 'Rp 15.000',
      location: 'Manado & sekitarnya',
      category: 'Help Antar',
      deliveries: 70,
      skills: [
        'Tas Thermal (Tahan Panas)',
        'Penanganan Higienis',
        'Antrian Resto Cepat',
      ],
      serviceId: 'rina_susanti_kurir_makanan',
    },
    {
      name: 'Hendra Kurnia',
      subtitle: 'Pesan Antar Barang',
      image: require('../assets/pesanAntar.png'),
      price: 'Rp 30.000',
      location: 'Manado & sekitarnya',
      category: 'Help Antar',
      deliveries: 60,
      skills: ['Angkut Barang Berat', 'Packing Aman', 'Pindahan Kost/Rumah'],
      serviceId: 'hendra_kurnia_pesan_antar',
    },
    {
      name: 'Siti Aminah',
      subtitle: 'Guru Matematika',
      image: require('../assets/guruMath.png'),
      price: 'Rp 100.000',
      location: 'Manado & sekitarnya',
      category: 'Help Pintar',
      deliveries: 30,
      skills: [
        'Matematika SD - SMA',
        'Persiapan UTBK/SNBT',
        'Trik Cepat Berhitung',
      ],
      serviceId: 'siti_aminah_guru',
    },
    {
      name: 'Ahmad Dahlan',
      subtitle: 'Guru Bahasa Inggris',
      image: require('../assets/guruBing.png'),
      price: 'Rp 120.000',
      location: 'Manado & sekitarnya',
      category: 'Help Pintar',
      deliveries: 33,
      skills: [
        'Conversation & Speaking',
        'Grammar & TOEFL Prep',
        'English for Kids',
      ],
      serviceId: 'ahmad_dahlan_guru',
    },
    {
      name: 'Rina Kusuma',
      subtitle: 'Tutor Fisika',
      image: require('../assets/guruFisika.png'),
      price: 'Rp 150.000',
      location: 'Manado & sekitarnya',
      category: 'Help Pintar',
      deliveries: 38,
      skills: [
        'Konsep Fisika Dasar',
        'Bedah Soal Olimpiade',
        'Bimbingan Tugas Sekolah',
      ],
      serviceId: 'rina_kusuma_tutor',
    },
    {
      name: 'Bambang Sutrisno',
      subtitle: 'Tutor Fisika',
      image: require('../assets/guruMusik.png'),
      price: 'Rp 80.000',
      location: 'Manado & sekitarnya',
      category: 'Help Pintar',
      deliveries: 38,
      skills: [
        'Les Privat Gitar/Piano',
        'Teori Musik Dasar',
        'Vokal & Paduan Suara',
      ],
      serviceId: 'bambang_sutrisno_tutor',
    },
    {
      name: 'Rudi Hartono',
      subtitle: 'Teknisi Komputer',
      image: require('../assets/computerTechnician.png'),
      price: 'Rp 150.000',
      location: 'Manado & sekitarnya',
      category: 'Help Tekno',
      deliveries: 45,
      skills: [
        'Install Ulang Windows',
        'Rakit PC Gaming/Office',
        'Basmi Virus & Malware',
      ],
      serviceId: 'rudi_hartono_teknisi',
    },
    {
      name: 'Eka Prasetya',
      subtitle: 'Service HP',
      image: require('../assets/phoneTechnician.png'),
      price: 'Rp 100.000',
      location: 'Manado & sekitarnya',
      category: 'Help Tekno',
      deliveries: 55,
      skills: [
        'Ganti LCD & Baterai',
        'Perbaikan Mati Total',
        'Unlock & Software Update',
      ],
      serviceId: 'eka_prasetya_teknisi',
    },
    {
      name: 'Deni Ramdadhan',
      subtitle: 'Installer Jaringan',
      image: require('../assets/networkTechnician.png'),
      price: 'Rp 200.000',
      location: 'Manado & sekitarnya',
      category: 'Help Tekno',
      deliveries: 57,
      skills: [
        'Setting WiFi & Mikrotik',
        'Instalasi Kabel LAN',
        'Troubleshoot Internet',
      ],
      serviceId: 'deni_ramadhan_teknisi',
    },
    {
      name: 'Wawan Setiawan',
      subtitle: 'Teknisi Laptop',
      image: require('../assets/laptopTechnician.png'),
      price: 'Rp 120.000',
      location: 'Manado & sekitarnya',
      category: 'Help Tekno',
      deliveries: 66,
      skills: [
        'Servis Engsel & Keyboard',
        'Upgrade RAM/SSD',
        'Cleaning Fan (Overheat)',
      ],
      serviceId: 'wawan_setiawan_teknisi',
    },
  ];

  // Extract unique categories and locations
  const categories = [...new Set(allServices.map(service => service.category))];
  const locations = [...new Set(allServices.map(service => service.location))];

  // Helper function to extract numeric price from string
  const extractPrice = (priceString: string): number => {
    const match = priceString.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  // Filter services based on all criteria
  const filteredServices = useMemo(() => {
    let filtered = allServices;

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        service =>
          service.name.toLowerCase().includes(query) ||
          service.subtitle.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query) ||
          service.location.toLowerCase().includes(query) ||
          service.skills.some(skill => skill.toLowerCase().includes(query)),
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filtered = filtered.filter(service => {
        const price = extractPrice(service.price);
        const min = minPrice ? parseFloat(minPrice) : 0;
        const max = maxPrice ? parseFloat(maxPrice) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(service => service.location === selectedLocation);
    }

    return filtered;
  }, [searchQuery, selectedCategory, minPrice, maxPrice, selectedLocation]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedLocation('');
    setShowFilterModal(false);
  };

  const applyFilters = () => {
    setShowFilterModal(false);
  };

  const hasActiveFilters = selectedCategory || minPrice || maxPrice || selectedLocation;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <Header2 />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Search and Filter Row */}
          <View style={styles.searchFilterRow}>
            <SearchBar
              style={styles.searchBar}
              placeholder={t('home.searchPlaceholder')}
              onChangeText={handleSearch}
            />
            <TouchableOpacity
              style={[styles.filterButton, hasActiveFilters && styles.filterButtonActive]}
              onPress={() => setShowFilterModal(true)}
            >
              <Text style={[styles.filterButtonText, hasActiveFilters && styles.filterButtonTextActive]}>
                Filter {hasActiveFilters ? '•' : ''}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Render filtered services */}
          {filteredServices.map((service, index) => (
            <OrderBox
              key={service.serviceId}
              style={styles.orderBox}
              name={service.name}
              subtitle={service.subtitle}
              image={service.image}
              price={service.price}
              location={service.location}
              category={service.category}
              deliveries={service.deliveries}
              skills={service.skills}
              navigation={navigation}
              serviceId={service.serviceId}
            />
          ))}

          {/* Show no results message when search or filters have results but no matches */}
          {((searchQuery.trim() || hasActiveFilters) && filteredServices.length === 0) && (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>
                {searchQuery.trim()
                  ? `Tidak ada hasil untuk "${searchQuery}"`
                  : 'Tidak ada layanan yang sesuai dengan filter yang dipilih'
                }
              </Text>
            </View>
          )}

          <Spacer height={25} />
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Layanan</Text>

            {/* Category Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Kategori</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      selectedCategory === category && styles.categoryChipSelected,
                    ]}
                    onPress={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                  >
                    <Text style={[
                      styles.categoryChipText,
                      selectedCategory === category && styles.categoryChipTextSelected,
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Price Range Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Kisaran Harga (Rp)</Text>
              <View style={styles.priceRangeContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Min"
                  value={minPrice}
                  onChangeText={setMinPrice}
                  keyboardType="numeric"
                />
                <Text style={styles.priceSeparator}>-</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Max"
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Location Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Lokasi</Text>
              <View style={styles.locationContainer}>
                {locations.map((location) => (
                  <TouchableOpacity
                    key={location}
                    style={[
                      styles.locationOption,
                      selectedLocation === location && styles.locationOptionSelected,
                    ]}
                    onPress={() => setSelectedLocation(selectedLocation === location ? '' : location)}
                  >
                    <Text style={[
                      styles.locationOptionText,
                      selectedLocation === location && styles.locationOptionTextSelected,
                    ]}>
                      {location}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearFilters}
              >
                <Text style={styles.clearButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>Terapkan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    paddingBottom: 90,
  },
  searchFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  searchBar: {
    flex: 1,
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterButtonActive: {
    borderColor: '#8BC34A',
    backgroundColor: '#E8F5E8',
  },
  filterButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#8BC34A',
  },
  orderBox: {
    marginVertical: 5,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    marginHorizontal: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B2559',
    textAlign: 'center',
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B2559',
    marginBottom: 12,
  },
  categoryScroll: {
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#8BC34A',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 16,
  },
  priceSeparator: {
    marginHorizontal: 12,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  locationOption: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  locationOptionSelected: {
    backgroundColor: '#8BC34A',
  },
  locationOptionText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  locationOptionTextSelected: {
    color: '#FFFFFF',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 14,
    marginRight: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#8BC34A',
    borderRadius: 10,
    paddingVertical: 14,
    marginLeft: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderScreen;
