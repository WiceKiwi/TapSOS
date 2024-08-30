import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity  } from 'react-native';
import * as Font from 'expo-font';

const CustomCard = ({customCards}) => {
    return (
        <View style={styles.section}>
            <View style={styles.infoRow}>
                <Text style={styles.header}>Custom Cards</Text>

            </View>
            
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.cardRow}
            >
                {customCards.map((card) => (
                <View key={card.id} style={[styles.card, { backgroundColor: `${card.backgroundColor}` }]}>
                    <Text style={styles.cardText}>{card.title}</Text>
                </View>
                ))}
            </ScrollView>
                
        </View>
    )
    
}

export default function NewCard() {
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

            <View>
                
                <View style={styles.section}>
                    <Text style={styles.header}>Title</Text>
                    <TextInput style={styles.textBoxShort}></TextInput>

                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Card Content</Text>
                    <TextInput style={styles.textBoxLong}></TextInput>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>
                            Create
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
            <CustomCard customCards={customCards}></CustomCard>
        </ScrollView>
        
    )

}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      marginVertical: 60,
      marginHorizontal: 20,

    //   backgroundColor: '#FEE2E2', // Background similar to the gradient
    },

    section: {
        marginBottom: 30,

    },
    header: {
      fontSize: 22,
      fontFamily: 'Inter-bold',
      marginBottom: 5,
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
    },

    card: {
      flex: 1,
      padding: 15,
      marginRight: 10,
      justifyContent: 'left',
      alignItems: 'baseline',
      height: 150,
      width: 150,
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