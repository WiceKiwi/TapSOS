import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity  } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';


export default function ParentCategoryCard({card}){
    const navigation = useNavigation();
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

    return(
        <TouchableOpacity key={card.id} style={[styles.card, { backgroundColor: `${card.backgroundColor}` }]} onPress={() => navigation.navigate('Category', { cardData: card })}>
            <Text style={styles.cardText}>{card.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingHorizontal: 40,
      backgroundColor: 'white', // Background similar to the gradient
    },

    section: {
        marginBottom: 30,

    },
    header: {
      fontSize: 22,
      fontFamily: 'Inter-bold',
      marginBottom: 5,
    },

    info: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    infoCard: {
        borderRadius: 15,
        backgroundColor: '#1111',
        paddingVertical: 10,
        paddingHorizontal: 20,
        
    },

    cardHeader: {
        fontSize: 22,
        fontFamily: 'Inter-bold',
    },

    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    
    value: {
      fontSize: 16,
      fontFamily: 'Inter-bold',
    },

    label: {
      fontSize: 16,
      fontFamily: 'Inter',
    },

    clickable: {
        fontSize: 14,
        fontFamily: 'Inter',
        textDecorationLine: 'underline',
    },
  

    cardRow: {
      flexDirection: 'row',
      marginBottom: 10,
    },

    card: {
      flex: 1,
      padding: 15,
      marginRight: 10,
      justifyContent: 'left',
      alignItems: 'baseline',
      height: 200,
      width: 200,
      backgroundColor: '#F89797',
      borderRadius: 15,
    },
    
    cardText: {
        fontSize: 16,
        textAlign: 'left',
        fontFamily: 'Inter-bold',
        marginBottom: 10,
        marginRight: 0,
    },
  });