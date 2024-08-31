import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from "../pages/HomePage";
import NewCard from '../pages/NewCard';
import DisplayText from '../pages/DisplayText';
import ProfilePage from '../pages/ProfilePage';
import LandingPage from '../pages/LandingPage';

const Tab = createBottomTabNavigator();

export default function NaviBar() {
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: {paddingTop: 5},
            headerShown: false,
            tabBarActiveTintColor: "#FF6B6B",
            tabBarInactiveTintColor: "#A5A5A5",
            
            tabBarLabelStyle: {
                fontSize: 10,
                fontFamily: 'Inter-bold',
            },
        }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
            tabBarIcon: ({color, size }) => (
                <Ionicons name="home" size={size} color={color} />
            ),
        }}/>
      <Tab.Screen
        name="Create"
        component={NewCard}
        options={{
            tabBarIcon: ({color, size }) => (
                <Ionicons name="add-circle" size={size} color={color} />
            ),
        }}/>
        <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
            tabBarIcon: ({color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
            ),
        }}/>
    </Tab.Navigator>
  );
}