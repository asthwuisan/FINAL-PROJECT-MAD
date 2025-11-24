import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput as Input,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import SignInHeader from '../components/molecules/Header/HSignIn';
import { firebaseAuth } from '../config/firebaseConfig';

export default function SignInScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Lengkapi Data', 'Email dan kata sandi wajib diisi.');
      return;
    }

    setLoading(true);

    try {
      await firebaseAuth.signInWithEmailAndPassword(email.trim(), password);
      setLoading(false);

      // Navigate to main tabs on successful login
      navigation.replace('MainTabs');
    } catch (error: any) {
      setLoading(false);

      let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Email tidak terdaftar.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Kata sandi salah.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Format email tidak valid.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'Akun telah dinonaktifkan.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Tidak ada koneksi internet.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Email atau kata sandi salah.';
      }

      Alert.alert('Gagal Masuk', errorMessage);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SignInHeader
        navigation={navigation}
        title="Daftar atau masuk untuk melanjutkan Hanya butuh waktu satu menit"
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Email</Text>
        <Input
          style={styles.input}
          placeholder="Contoh : helpyu@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Kata Sandi</Text>
        <Input
          style={styles.input}
          placeholder="Contoh : #Sandi123"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={handleSignIn}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Masuk</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Belum punya akun? Daftar</Text>
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
  link: {
    textAlign: 'center',
    marginTop: 15,
    color: '#14244B',
    fontWeight: '600',
  },
});
