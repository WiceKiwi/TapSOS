import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity  } from 'react-native';
import * as Font from 'expo-font';
import Card from '../components/Card';
import axios from 'axios';

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
                <Card card={card}></Card>
                ))}
            </ScrollView>
                
        </View>
    )
    
}

export default function NewCard({navigation}) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [apiResponse, setApiResponse] = useState(null);

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

    const handleCreate = async () => {
        try {
            console.log('New Title:', newTitle);
            console.log('New Content:', newContent);

            const apiUrl = 'http://192.168.86.25:8000/emergency-cards/';  // Replace with your actual IP and endpoint

            const response = await axios.post(apiUrl, {
                user: "John Doe",
                title: newTitle,
                content: newContent,
                source: "custom",
            });

            console.log('Response:', response.data);

            // Clear the input fields
            setApiResponse(true);
            setNewTitle('');
            setNewContent('');

        } catch (error) {
            console.error('Error creating card:', error);
            setApiResponse(false)
        }
    };


    return(
        <ScrollView contentContainerStyle={styles.container}>
            {apiResponse && (
                <View style={styles.flagTrue}>
                    <Text style={styles.flagText}>Card created successfully!</Text>
                </View>
            )}
            {!apiResponse && (
            <View style={styles.flagFalse}>
                <Text style={styles.flagText}>Error in creating new card, try again later</Text>
            </View>
            )}

            <View>
                
                <View style={styles.section}>
                    <Text style={styles.header}>Title</Text>
                    <TextInput style={styles.textBoxShort}   
                    onChangeText={(text) => setNewTitle(text)} 
                    value={newTitle} 
                    placeholder="Enter your title here"
                    textAlignVertical="top">

                    </TextInput>


                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Card Content</Text>
                    <TextInput style={styles.textBoxLong} onChangeText={(text) => setNewContent(text)} 
                    value={newContent} 
                    placeholder="Enter your content here"
                    textAlignVertical="top"
                    multiline={true}>
                    </TextInput>
                    <TouchableOpacity style={styles.button} onPress={handleCreate}>
                        <Text style={styles.buttonText}>
                            Create
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
            {/* <CustomCard customCards={customCards}></CustomCard> */}
        </ScrollView>
        
    )

}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingHorizontal: 40,
      backgroundColor: 'white', // Background similar to the gradient
    },

    flagTrue: {
        padding: 10,
        backgroundColor:'#C0FFBB',
        borderRadius: 15,
        marginBottom: 10,
    },

    flagFalse: {
        padding: 10,
        backgroundColor:'#FDBDC0',
        borderRadius: 15,
        marginBottom: 10,
    },

    flagText: {
        fontSize: 14,
        fontFamily: 'Inter-bold',
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
        backgroundColor: '#1111',
        
        fontSize: 14,
        fontFamily: 'Inter',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },

    textBoxLong: {
        borderRadius: 15,
        backgroundColor: '#1111',
        
        fontSize: 14,
        fontFamily: 'Inter',
        paddingHorizontal: 10,
        paddingVertical: 10,
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