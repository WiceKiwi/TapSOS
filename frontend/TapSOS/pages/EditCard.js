import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity  } from 'react-native';
import * as Font from 'expo-font';
import Card from '../components/Card';
import * as ScreenOrientation from 'expo-screen-orientation';

const Flag = ({status}) => {
    return (
        <View style={styles.flag}>
            <Text style={styles.flagText}>Changes saved successfully!</Text>
        </View>
    )
}

export default function EditCard({route, navigation}) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const {cardData} = route.params
    
    const [newTitle, setNewTitle] = useState(cardData.title);
    const [newContent, setNewContent] = useState(cardData.text);

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
        return null; // Alternatively, you can return a simple loading view here
    }

    const handleCreate = () => {
        console.log('New Title:', newTitle);
        console.log('New Content:', newContent);
      };
    
    const handleDelete = () => {
        console.log('Deleted Title:', newTitle);
        console.log('New Content:', newContent);
      };

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {/* <Flag></Flag> */}

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

                        <TouchableOpacity style={styles.button} onPress={handleCreate}>
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

    flag: {
        padding: 10,
        backgroundColor:'#C0FFBB',
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