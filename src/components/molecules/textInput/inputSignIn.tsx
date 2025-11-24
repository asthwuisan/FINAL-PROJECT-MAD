import React, {useState} from 'react';
import {View, Text, TextInput as Input, StyleSheet} from 'react-native';

export default function InputSignIn({navigation}: {navigation: any}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={styles.label}>Email</Text>
      <Input
        style={styles.input}
        placeholder="Contoh : helpyu@gmail.com"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Kata Sandi</Text>
      <Input
        style={styles.input}
        placeholder="Contoh : #Sandi123"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
    </View>
  );
}

export default InputSignIn;

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
  btn: {
    backgroundColor: '#14244B',
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
  },
  btnText: {color: '#fff', textAlign: 'center', fontWeight: '600'},
  link: {
    textAlign: 'center',
    marginTop: 15,
    color: '#14244B',
    fontWeight: '600',
  },
});
