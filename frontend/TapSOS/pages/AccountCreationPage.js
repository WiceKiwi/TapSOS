import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Animated, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';

export default function AccountCreation({navigator}){
    const scaleValue = useRef(new Animated.Value(1)).current;
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const navigation = useNavigation();

    // Load the custom fonts
    useEffect(() => {
        async function loadFonts() {
        await Font.loadAsync({
            'Inter': require('../assets/Inter-VariableFont_opsz,wght.ttf'),
            'Inter-bold': require('../assets/Inter_24pt-Bold.ttf'),
        });
        setFontsLoaded(true); // Set fontsLoaded to true once fonts are loaded
        }

        loadFonts();
    }, []);

    // Render nothing until the fonts are loaded
    if (!fontsLoaded) {
        return null; // Alternatively, you can return a simple loading view here
    }

    

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/LogoFix.png')}
                style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
            />
            <View style={styles.section}>
              <Text style={styles.slogan}>Account successfully</Text>
              <Text style={styles.slogan}>created!</Text>
            </View>
            

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
                <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff', // Background color for the page
    },
    logo: {
      width: 100, // Adjust to your logo size
      height: 100, // Adjust to your logo size
    },
    section: {
      marginBottom: 100,
    },
    slogan:{
      fontFamily: 'Inter-bold',
      fontSize: 20,
      marginBottom: -10,
      textAlign: 'center',

    },
    button: {
      marginTop: 100,
      borderRadius: 15,
      backgroundColor: '#F89797',
      paddingHorizontal: 70,
      paddingVertical: 10,

    },
    buttonText: {
      fontSize: 14,
      fontFamily: 'Inter-bold',
      textAlign: 'center',
    },
  });