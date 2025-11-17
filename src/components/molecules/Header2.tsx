import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';

const Header2 = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: '#FAFAFA',
        elevation: 15,
        paddingTop: 50,
        paddingBottom: 15,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        {/* Tombol Kembali */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 14, color: '#3B8ED1' }}>Kembali</Text>
        </TouchableOpacity>

        {/* Judul */}
        <View style={{ flex: 1, alignItems: 'center', marginLeft: -40 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: '#202C60',
              marginLeft: -20,
            }}
          >
            Pesan Jasa
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header2;
