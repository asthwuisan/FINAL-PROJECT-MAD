import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

// Simple icon components using React Native View and Text components
// These create basic geometric shapes to represent icons

export const EditProfileIcon = ({ size = 22, color = '#1F2937' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={[styles.circle, { borderColor: color, width: size, height: size, borderRadius: size / 2, borderWidth: 2 }]} />
    <View style={[styles.personHead, { backgroundColor: color, width: size * 0.5, height: size * 0.5, borderRadius: size * 0.25, top: size * 0.1, left: size * 0.25 }]} />
  </View>
);

export const PaymentMethodIcon = ({ size = 22, color = '#1F2937' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={[styles.card, { borderColor: color, width: size * 0.85, height: size * 0.55, borderRadius: 3, borderWidth: 2, top: size * 0.15, left: size * 0.075 }]} />
    <View style={[styles.cardLine, { backgroundColor: color, width: size * 0.5, height: 2, top: size * 0.35, left: size * 0.25, borderRadius: 1 }]} />
  </View>
);

export const LanguageIcon = ({ size = 22, color = '#1F2937' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={[styles.circle, { borderColor: color, width: size, height: size, borderRadius: size / 2, borderWidth: 2 }]} />
    <View style={[styles.languageLine, { backgroundColor: color, width: size * 0.5, height: 1.5, top: size * 0.3, left: size * 0.25, borderRadius: 1 }]} />
    <View style={[styles.languageLine, { backgroundColor: color, width: size * 0.5, height: 1.5, top: size * 0.5, left: size * 0.25, borderRadius: 1 }]} />
    <View style={[styles.languageLine, { backgroundColor: color, width: size * 0.5, height: 1.5, top: size * 0.7, left: size * 0.25, borderRadius: 1 }]} />
  </View>
);

export const HelpCenterIcon = ({ size = 22, color = '#1F2937' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={[styles.circle, { borderColor: color, width: size, height: size, borderRadius: size / 2, borderWidth: 2 }]} />
    <Text style={[styles.questionMark, { color, fontSize: size * 0.7, top: -size * 0.05 }]}>?</Text>
  </View>
);

export const LogoutIcon = ({ size = 22, color = '#1F2937' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={[styles.door, { borderColor: color, width: size * 0.5, height: size * 0.7, borderRadius: 2, borderWidth: 2, top: size * 0.15, left: size * 0.1 }]} />
    <View style={[styles.arrow, { 
      width: 0, 
      height: 0, 
      borderTopWidth: size * 0.15, 
      borderBottomWidth: size * 0.15, 
      borderLeftWidth: size * 0.2, 
      borderTopColor: 'transparent', 
      borderBottomColor: 'transparent', 
      borderLeftColor: color,
      top: size * 0.35, 
      left: size * 0.65 
    }]} />
  </View>
);

export const ChevronForwardIcon = ({ size = 20, color = '#9CA3AF' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={[styles.chevron, { 
      width: size * 0.4, 
      height: size * 0.4, 
      borderTopWidth: 2, 
      borderRightWidth: 2, 
      borderTopColor: color, 
      borderRightColor: color,
      top: size * 0.3, 
      left: size * 0.2, 
      transform: [{ rotate: '45deg' }] 
    }]} />
  </View>
);

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
  },
  personHead: {
    position: 'absolute',
  },
  card: {
    position: 'absolute',
  },
  cardLine: {
    position: 'absolute',
  },
  languageLine: {
    position: 'absolute',
  },
  questionMark: {
    position: 'absolute',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  door: {
    position: 'absolute',
  },
  arrow: {
    position: 'absolute',
  },
  chevron: {
    position: 'absolute',
  },
});

