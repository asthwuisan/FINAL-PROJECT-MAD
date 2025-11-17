import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

const BottomNav = ({activeTab, onChangeTab}) => {
  const menus = [
    {key: 'home', label: 'Beranda', icon: require('../../assets/home.png')},
    {key: 'pesan', label: 'Pesan', icon: require('../../assets/order.png')},
    {
      key: 'favorit',
      label: 'Favorit',
      icon: require('../../assets/heart.png'),
    },
    {key: 'poin', label: 'Poin', icon: require('../../assets/award.png')},
    {key: 'saya', label: 'Saya', icon: require('../../assets/user.png')},
  ];

  return (
    <View style={styles.container}>
      {menus.map(item => {
        const isActive = activeTab === item.key;

        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => onChangeTab(item.key)}
            style={styles.menuItem}>
            <Image
              source={item.icon}
              style={[
                styles.icon,
                {tintColor: isActive ? '#10162f' : '#C6C6C6'},
              ]}
            />
            <Text
              style={[
                styles.label,
                {
                  color: isActive ? '#10162f' : '#C6C6C6',
                  fontWeight: isActive ? 'bold' : 'normal',
                },
              ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // tempel di bawah layar
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 10, // shadow Android
    shadowColor: '#000', // shadow iOS
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: -2},
    shadowRadius: 8,
  },

  menuItem: {
    alignItems: 'center',
  },

  icon: {
    width: 26,
    height: 26,
  },

  label: {
    marginTop: 3,
    fontSize: 12,
  },
});

export default BottomNav;
