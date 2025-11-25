import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

const SignInHeader = ({title}: {navigation: any; title: string}) => (
  <View style={headerStyles.headerContainer}>
    <Text style={headerStyles.headerTitle}>{title}</Text>

    <View style={headerStyles.placeholder} />
  </View>
);

export default SignInHeader;

const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
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
    fontFamily: 'Poppins-Regular',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#14244B',
    textAlign: 'center',
    justifyContent: 'center',
    
  },
  placeholder: {
    flex: 1,
  },
});
