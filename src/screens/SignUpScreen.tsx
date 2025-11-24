import React, { useState } from 'react';
import SignUpHeader from '../components/molecules/Header/HSignUp';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { firebaseAuth, firebaseFirestore, collections } from '../config/firebaseConfig';

export default function SignUpScreen({ navigation }: { navigation: any }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
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

    setLoading(true);

    try {
      // Create user with Firebase Auth
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(
        email.trim(),
        pwd
      );

      console.log('User created:', userCredential.user?.uid);
      const user = userCredential.user;

      if (user) {
        console.log('Writing to Firestore...');
        // Store additional user data in Firestore
        await firebaseFirestore.collection(collections.users).doc(user.uid).set({
          uid: user.uid,
          email: email.trim(),
          name: name.trim(),
          phone: phone.trim(),
          createdAt: new Date(),
        });
        console.log('Firestore write successful');
      } else {
        console.error('User object is null');
      }

      setLoading(false);

      Alert.alert('Berhasil', 'Akun berhasil dibuat!', [
        {
          text: 'OK',
          onPress: () => navigation.replace('SignIn'),
        },
      ]);
    } catch (error: any) {
      setLoading(false);

      let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email sudah terdaftar. Silakan gunakan email lain.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Format email tidak valid.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Kata sandi terlalu lemah.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Tidak ada koneksi internet.';
      }

      Alert.alert('Gagal Mendaftar', errorMessage);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
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

        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={handleRegister}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Daftar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, paddingBottom: 50 },
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
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
