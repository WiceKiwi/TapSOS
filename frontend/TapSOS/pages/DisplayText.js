import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Touchable, Button  } from 'react-native';
import * as Font from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';


const SGLanguages = [
    {
        display: "English",
        name: "English"
    },
    {
        display: "中文",
        name: "Chinese (Simplified)"
    },
    {
        display: "Bahasa Melayu",
        name: "Malay"
    },
    {
        display: "தமிழ்",
        name: "Tamil"
    },
]

const TranslateButton = ({language}) => {
    return (
        <TouchableOpacity style={styles.translateButton}>
            <Text>{language.display}</Text>
        </TouchableOpacity>
    )
}


export default function DisplayText({route, navigation}) {
    const { cardData } = route.params;
    useEffect(() => {
        // Lock the orientation to landscape when this screen is mounted
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
        // Reset orientation to portrait when leaving this screen
        return () => {
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        };
      }, []);
      
    const [fontsLoaded, setFontsLoaded] = useState(false);

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

    const customCards = [
        { id: 1, title: 'Penicillin Allergic Reaction', backgroundColor: '#F89797' },
        { id: 2, title: 'Peanuts Allergic Reaction', backgroundColor: '#FBCFCF' },
        { id: 3, title: 'Help Finding Wallet', backgroundColor: '#FCDADA'  },

      ];

    return(
            <ScrollView contentContainerStyle={styles.container}>

                <Text style={styles.textBig}>{cardData.text}</Text>
                <View style={styles.cardRow}>
                    {SGLanguages.map((language)=> (
                        <TranslateButton language={language} ></TranslateButton>
                    ))}
                </View>
            </ScrollView>
        
        
    )

}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingHorizontal: 20,
      backgroundColor: 'white', // Background similar to the gradient
    },

    section: {
        marginBottom: 30,

    },

    translateButton: {
        backgroundColor: '#1111',
        padding: 10,
        borderRadius: 15,
        textAlign: 'center',
        marginRight: 10,
    },

    textBig: {
      fontSize: 36,
      fontFamily: 'Inter-bold',
      marginBottom: 10,
      textAlign: 'center',
    },

    textBoxShort: {
        borderRadius: 15,
        backgroundColor: 'white',
        
        fontSize: 14,
        fontFamily: 'Inter',
        paddingHorizontal: 10,
        paddingVertical: 5,


    },

    textBoxLong: {
        borderRadius: 15,
        backgroundColor: 'white',
        
        fontSize: 14,
        fontFamily: 'Inter',
        paddingHorizontal: 10,
        paddingVertical: 5,
        height: 100,



    },

    button:{
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: '#F89797',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 80,
        marginLeft: 250,
    },

    buttonText:{
        fontSize: 14,
        fontFamily: 'Inter-bold',
        textAlign: 'center',
    },


    clickable: {
        fontSize: 14,
        fontFamily: 'Inter',
        textDecorationLine: 'underline',
    },
  

    cardRow: {
      flexDirection: 'row',
      marginBottom: 10,
      marginLeft: 20,
    },
  });