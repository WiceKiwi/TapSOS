import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, Image } from "react-native";

import NaviBar from "./components/NaviBar";
import { View } from "react-native";
import DisplayText from "./pages/DisplayText";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
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
        />
        <Stack.Screen
            name="Profile"
            component={ProfilePage}
        />
        <Stack.Screen
            name="Home"
            component={HomePage}
        />
        <Stack.Screen
            name="Category"
            component={CategoriesPage}
        />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;