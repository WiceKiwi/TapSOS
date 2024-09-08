import React, {useState, useEffect, useContext} from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity  } from 'react-native';
import * as Font from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';
import axios from 'axios';
import { UserContext } from '../components/User';

export default function EditCard({route, navigation}) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const {cardData} = route.params
    const [newTitle, setNewTitle] = useState(cardData.title);
    const [newContent, setNewContent] = useState(cardData.text);
    const [apiResponse, setApiResponse] = useState(null);
    const { user } = useContext(UserContext)

    useEffect(() => {
        // Lock the orientation to landscape when this screen is mounted
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    
        // Reset orientation to portrait when leaving this screen
        return () => {
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        };
      }, []);
    
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
        return null; 
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete('http://192.168.86.25:8000/emergency-cards/2/')

            console.log('Response:', response.data);
            setApiResponse('delete-success');

            navigation.navigate('Home');

            // Clear the input fields
            setNewTitle('');
            setNewContent('');

        } catch (error) {
            console.error('Error creating card:', error);
            setApiResponse('delete-error');
        }
      };
    
    const handleEdit = async () => {
        try {
            const response = await axios.put('http://192.168.86.25:8000/emergency-cards/1/', {
                user: user.name,
                title: newTitle,
                content: newContent,
                source: "custom",
            });

            console.log('Card successfully edited:', response.data);
            setApiResponse('edit-success');

            // Clear the input fields
            setNewTitle('');
            setNewContent('');

        } catch (error) {
            console.error('Error creating card:', error);
            setApiResponse('edit-error')
        }
    };

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {apiResponse === 'edit-success'&& (
                <View style={styles.flagTrue}>
                    <Text style={styles.flagText}>Card edited successfully!</Text>
                </View>
            )}
            {apiResponse === 'delete-success'&& (
                <View style={styles.flagTrue}>
                    <Text style={styles.flagText}>Card deleted successfully!</Text>
                </View>
            )}
            {apiResponse === 'edit-error' && (
            <View style={styles.flagFalse}>
                <Text style={styles.flagText}>Error in editing card, try again later</Text>
            </View>
            )}
            {apiResponse === 'delete-error' && (
            <View style={styles.flagFalse}>
                <Text style={styles.flagText}>Error in deleting card, try again later</Text>
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

                    <View style={styles.cardRow}>
                        <TouchableOpacity style={styles.button} onPress={handleDelete}>
                            <Text style={styles.buttonText}>
                                Delete
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={handleEdit}>
                            <Text style={styles.buttonText}>
                                Edit
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                
            </View>
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
        flexWrap: 'wrap',
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
      justifyContent: 'space-between',
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