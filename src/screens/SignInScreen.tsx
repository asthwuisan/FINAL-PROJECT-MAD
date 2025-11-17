import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function SignInScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masuk</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh : helpyu@gmail.com"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Kata Sandi</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh : #Sandi123"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Masuk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Belum punya akun? Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 25 },
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
  btnText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  link: {
    textAlign: 'center',
    marginTop: 15,
    color: '#14244B',
    fontWeight: '600',
  },
});
