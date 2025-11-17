import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const CustomHeader = ({
  navigation,
  title,
}: {
  navigation: any;
  title: string;
}) => (
  <View style={headerStyles.headerContainer}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={headerStyles.backButton}
    >
      <Text style={headerStyles.backText}>{'.. Kembali'}</Text>
    </TouchableOpacity>

    <Text style={headerStyles.headerTitle}>{title}</Text>

    <View style={headerStyles.placeholder} />
  </View>
);

export default function SignUpScreen({ navigation }: { navigation: any }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <CustomHeader navigation={navigation} title="Daftar" />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Nama lengkap</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>No. Ponsel</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Buat kata sandi</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={pwd}
          onChangeText={setPwd}
        />

        <Text style={styles.label}>Ulangi kata sandi</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={pwd2}
          onChangeText={setPwd2}
        />

        <Text style={styles.rules}>● Harus 8 - 20 karakter</Text>
        <Text style={styles.rules}>
          ● Harus ada min. 1 angka atau simbol (!@#$%)
        </Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Daftar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
  },
  backButton: {
    flex: 1,
    alignItems: 'flex-start',
  },
  backText: {
    color: '#455888ff',
    fontSize: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#14244B',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    flex: 1,
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingBottom: 50,
  },
  label: { marginTop: 10, marginBottom: 5, fontWeight: '500' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rules: { fontSize: 12, color: '#777', marginTop: 4 },
  btn: {
    backgroundColor: '#14244B',
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
  },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
