import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';

// Screens
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import OrderScreen from './src/screens/OrderScreen';
import FavoritePage from './src/screens/FavoritePage';
import PointsPage from './src/screens/PointsPage';
import ProfileSettingsPage from './src/screens/ProfileSettingsPage';
import PaymentPage from './src/screens/PaymentPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#001f3f',
        tabBarInactiveTintColor: '#8ea3b7',
        tabBarIcon: ({focused}) => {
          let icon;

          if (route.name === 'Beranda') {
            icon = focused
              ? require('./src/assets/home.png')
              : require('./src/assets/homegrey.png');
          } else if (route.name === 'Pesan') {
            icon = focused
              ? require('./src/assets/order.png')
              : require('./src/assets/ordergrey.png');
          } else if (route.name === 'Favorit') {
            icon = focused
              ? require('./src/assets/heart.png')
              : require('./src/assets/heartgrey.png');
          } else if (route.name === 'Poin') {
            icon = focused
              ? require('./src/assets/award.png')
              : require('./src/assets/awardgrey.png');
          } else if (route.name === 'Saya') {
            icon = focused
              ? require('./src/assets/user.png')
              : require('./src/assets/profilegrey.png');
          }

          return <Image source={icon} style={{width: 28, height: 28}} />;
        },
      })}>
      <Tab.Screen name="Beranda" component={HomeScreen} />
      <Tab.Screen name="Pesan" component={OrderScreen} />
      <Tab.Screen name="Favorit" component={FavoritePage} />
      <Tab.Screen name="Poin" component={PointsPage} />
      <Tab.Screen name="Saya" component={ProfileSettingsPage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Payment" component={PaymentPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
