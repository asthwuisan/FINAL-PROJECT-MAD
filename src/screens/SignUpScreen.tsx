import React, {useState} from 'react';
import SignUpHeader from '../components/molecules/Header/HSignUp';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

export default function SignUpScreen({navigation}: {navigation: any}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');

  const handleRegister = () => {
    // Validasi dasar
    if (!name || !phone || !email || !pwd || !pwd2) {
      Alert.alert('Lengkapi Data', 'Semua kolom wajib diisi.');
      return;
    }

    if (pwd.length < 8) {
      Alert.alert('Kata Sandi Lemah', 'Kata sandi harus minimal 8 karakter.');
      return;
    }

    if (pwd !== pwd2) {
      Alert.alert('Kata Sandi Tidak Cocok', 'Silakan ulangi kembali.');
      return;
    }

    // Jika semua valid → kembali ke halaman Login
    Alert.alert('Berhasil', 'Akun berhasil dibuat!', [
      {
        text: 'OK',
        onPress: () => navigation.replace('SignIn'),
      },
    ]);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <SignUpHeader navigation={navigation} title="Daftar" />

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

        <TouchableOpacity style={styles.btn} onPress={handleRegister}>
          <Text style={styles.btnText}>Daftar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 25, paddingBottom: 50},
  label: {marginTop: 10, marginBottom: 5, fontWeight: '500'},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rules: {fontSize: 12, color: '#777', marginTop: 4},
  btn: {
    backgroundColor: '#14244B',
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
  },
  btnText: {color: '#fff', textAlign: 'center', fontWeight: '600'},
});
