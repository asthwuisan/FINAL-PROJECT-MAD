import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SettingsListItemProps {
  label: string;
  icon: string;       // icon name seperti "person-circle-outline"
  onPress?: () => void;
}

export const SettingsListItem: React.FC<SettingsListItemProps> = ({
  label,
  icon,
  onPress,
}) => (
  <TouchableOpacity style={stylesItem.container} onPress={onPress}>
    <View style={stylesItem.leftContent}>
      <Ionicons name={icon} size={22} color="#1F2937" />
      <Text style={stylesItem.label}>{label}</Text>
    </View>

    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
  </TouchableOpacity>
);

const stylesItem = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 16,
    color: '#111827',
  },
});
