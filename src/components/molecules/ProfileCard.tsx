import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


interface ProfileCardProps {
name: string;
phone: string;
onPressProfile?: () => void;
}


export const ProfileCard: React.FC<ProfileCardProps> = ({ name, phone, onPressProfile }) => {
return (
<TouchableOpacity style={styles.card} onPress={onPressProfile}>
<Image source={require('../assets/profile.png')} style={styles.avatar} />
<View style={styles.infoContainer}>
<Text style={styles.name}>{name}</Text>
<Text style={styles.phone}>{phone}</Text>
</View>
</TouchableOpacity>
);
};


const styles = StyleSheet.create({
card: {
flexDirection: 'row',
alignItems: 'center',
padding: 16,
backgroundColor: '#fff',
borderRadius: 12,
shadowColor: '#000',
shadowOpacity: 0.1,
shadowRadius: 6,
elevation: 3,
marginBottom: 20,
},
avatar: {
width: 60,
height: 60,
borderRadius: 30,
backgroundColor: '#D1D5DB',
},
infoContainer: {
marginLeft: 12,
},
name: {
fontSize: 18,
fontWeight: 'bold',
color: '#1F2937',
},
phone: {
fontSize: 14,
color: '#4B5563',
},
});