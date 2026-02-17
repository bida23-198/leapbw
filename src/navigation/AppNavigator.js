import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { useAuth } from '../utils/AuthContext';

// Import screens
import CareerScreen from '../screens/CareerScreen';
import DashboardScreen from '../screens/DashboardScreen';
import EventsScreen from '../screens/EventsScreen';
import ForumsScreen from '../screens/ForumsScreen';
import GenderScreen from '../screens/GenderScreen';
import HomeScreen from '../screens/HomeScreen';
import LearningScreen from '../screens/LearningScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import YouthScreen from '../screens/YouthScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Drawer Navigator for authenticated users
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
          marginLeft: -10,
        },
        drawerActiveTintColor: '#ADD8E6',
        drawerInactiveTintColor: '#666',
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 4 }}>🏠</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          drawerLabel: 'My Dashboard',
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 4 }}>📊</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Youth" 
        component={YouthScreen}
        options={{
          drawerLabel: 'Youth Programs',
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 4 }}>🌟</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Gender & Equality" 
        component={GenderScreen}
        options={{
          drawerLabel: 'Gender & Equality',
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 4 }}>⚖️</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Learning" 
        component={LearningScreen}
        options={{
          drawerLabel: 'Learning',
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 4 }}>📚</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Career Advancement" 
        component={CareerScreen}
        options={{
          drawerLabel: 'Career Advancement',
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 4 }}>💼</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Events" 
        component={EventsScreen}
        options={{
          drawerLabel: 'Events',
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 4 }}>📅</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Community Forums" 
        component={ForumsScreen}
        options={{
          drawerLabel: 'Community Forums',
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 4 }}>💬</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Resources" 
        component={ResourcesScreen}
        options={{
          drawerLabel: 'Resources',
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 4 }}>🔗</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 4 }}>⚙️</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// Stack Navigator for authentication
function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

const AppNavigator = () => {
  const { user, loading } = useAuth();

  console.log('AppNavigator - Loading:', loading, 'User:', user);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;