import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { UserProvider } from './src/context/UserContext';

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

// Import Category Screens
import HelpRumah from './src/screens/HelpRumah';
import HelpAntar from './src/screens/HelpAntar';
import HelpPintar from './src/screens/HelpPintar';
import HelpTekno from './src/screens/HelpTekno';

// Import Payment Screens
import PaymentPage from './src/screens/PaymentPage';
import PaymentSuccessScreen from './src/screens/PaymentSuccessScreen';

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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
