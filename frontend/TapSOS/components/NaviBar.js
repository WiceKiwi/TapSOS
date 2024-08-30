import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from "../pages/HomePage";
import NewCard from '../pages/NewCard';
import DisplayText from '../pages/DisplayText';
import ProfilePage from '../pages/ProfilePage';

const Tab = createBottomTabNavigator();

export default function NaviBar() {
  return (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#32E08C",
            tabBarInactiveTintColor: "#A5A5A5",
            tabBarLabelStyle: {
                fontSize: 12.5,
                fontWeight: 900
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
        name="Upload"
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
                <Ionicons name="add-circle" size={size} color={color} />
            ),
        }}/>
    </Tab.Navigator>
  );
}