import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {
  EditProfileIcon,
  PaymentMethodIcon,
  LanguageIcon,
  HelpCenterIcon,
  LogoutIcon,
  ChevronForwardIcon,
} from './SettingsIcons';

interface SettingsListItemProps {
  label: string;
  icon: string; // icon name seperti "person-circle-outline"
  onPress?: () => void;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'person-circle-outline':
      return <EditProfileIcon />;
    case 'card-outline':
      return <PaymentMethodIcon />;
    case 'language-outline':
      return <LanguageIcon />;
    case 'help-circle-outline':
      return <HelpCenterIcon />;
    case 'log-out-outline':
      return <LogoutIcon />;
    default:
      return <EditProfileIcon />;
  }
};

export const SettingsListItem: React.FC<SettingsListItemProps> = ({
  label,
  icon,
  onPress,
}) => (
  <TouchableOpacity style={stylesItem.container} onPress={onPress}>
    <View style={stylesItem.leftContent}>
      <View style={stylesItem.iconWrapper}>
        {getIconComponent(icon)}
      </View>
      <Text style={stylesItem.label}>{label}</Text>
    </View>

    <ChevronForwardIcon />
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
  },
  iconWrapper: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#111827',
  },
});
