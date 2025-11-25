import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { UserProvider } from './src/context/UserContext';
import { LanguageProvider } from './src/context/LanguageContext';

// Import Screens
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import OrderScreen from './src/screens/OrderScreen';
import FavoritePage from './src/screens/FavoritePage';
import PointsPage from './src/screens/PointsPage';
import ProfileSettingsPage from './src/screens/ProfileSettingsPage';
import NotificationScreen from './src/screens/NotificationScreen';

// Import Category Screens
import HelpRumah from './src/screens/HelpRumah';
import HelpAntar from './src/screens/HelpAntar';
import HelpPintar from './src/screens/HelpPintar';
import HelpTekno from './src/screens/HelpTekno';

// Import Payment Screens
import PaymentPage from './src/screens/PaymentPage';
import PaymentSuccessScreen from './src/screens/PaymentSuccessScreen';
import OrderStatusScreen from './src/screens/OrderStatusScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import LanguageScreen from './src/screens/LanguageScreen';
import HelpCenterScreen from './src/screens/HelpCenterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ======================
//  BOTTOM TAB NAVIGATOR
// ======================
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#001f3f',
        tabBarInactiveTintColor: '#8ea3b7',
        tabBarIcon: ({ focused }) => {
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

          return <Image source={icon} style={{ width: 28, height: 28 }} />;
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

// ======================
//  ROOT STACK NAVIGATOR
// ======================
export default function App() {
  return (
    <UserProvider>
      <LanguageProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Initial Flow */}
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />

            {/* Main App - Bottom Tabs */}
            <Stack.Screen name="MainTabs" component={BottomTabs} />

            {/* Category Detail Screens */}
            <Stack.Screen name="HelpRumah" component={HelpRumah} />
            <Stack.Screen name="HelpAntar" component={HelpAntar} />
            <Stack.Screen name="HelpPintar" component={HelpPintar} />
            <Stack.Screen name="HelpTekno" component={HelpTekno} />

          {/* Payment Flow */}
          <Stack.Screen name="Payment" component={PaymentPage} />
          <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
          <Stack.Screen name="OrderStatus" component={OrderStatusScreen} />

            {/* Notification Screen */}
            <Stack.Screen name="Notification" component={NotificationScreen} />

            {/* Profile Settings Screens */}
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Language" component={LanguageScreen} />
            <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </UserProvider>
  );
}
