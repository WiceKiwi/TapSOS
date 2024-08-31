import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, Image } from "react-native";

import NaviBar from "./components/NaviBar";
import { View } from "react-native";
import DisplayText from "./pages/DisplayText";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import NewUserPage from "./pages/LandingPage";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import AccountCreation from "./pages/AccountCreationPage";
import EditCard from "./pages/EditCard";
import EditProfilePage from "./pages/EditProfilePage";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            navigationBarHidden: false,
            headerTitleAlign: 'center',
            headerTitle: () => (
              <View style={{ width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Image 
                  source={require('./assets/LogoFix.png')} 
                  style={{ width: '100%', height: '100%' }} 
                  resizeMode="contain" 
                />
              </View>
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
               
              </View>
            ),
            headerStyle: {
              height: 50,
            },
            headerBackground: () => (
              <View>
              </View>
              
            ),
          }}>
        <Stack.Screen
          name="NaviBar"
          component={NaviBar}
        />
        <Stack.Screen
            name="Display"
            component={DisplayText}
            options={{ headerShown: true, navigationBarHidden: true}}
        />
        <Stack.Screen
            name="Profile"
            component={ProfilePage}
            options={{ headerShown: true, navigationBarHidden: false}}
        />
        <Stack.Screen
            name="Home"
            component={HomePage}
            options={{ headerShown: true, navigationBarHidden: false}}
        />
        <Stack.Screen
            name="Category"
            component={CategoriesPage}
            options={{ headerShown: true, navigationBarHidden: false}}
        />
        <Stack.Screen
            name="Landing"
            component={LandingPage}
            options={{ headerShown: false}}
        />
        <Stack.Screen
            name="SignUp"
            component={SignUpPage}
            options={{ headerShown: true}}
        />
        <Stack.Screen
            name="AccountCreation"
            component={AccountCreation}
            options={{ headerShown: false}}
        />
        <Stack.Screen
            name="EditCard"
            component={EditCard}
            options={{ headerShown: true, navigationBarHidden: false}}
        />
        <Stack.Screen
            name="EditProfile"
            component={EditProfilePage}
            options={{ headerShown: true, navigationBarHidden: false}}
        />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;