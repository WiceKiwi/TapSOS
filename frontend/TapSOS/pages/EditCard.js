import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity  } from 'react-native';
import * as Font from 'expo-font';
import Card from '../components/Card';


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

const Flag = ({status}) => {
    return (
        <View style={styles.flag}>
            <Text style={styles.flagText}>Card created successfully!</Text>
        </View>
    )
}

export default function EditCard({navigation}) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

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

    const customCards = [
        { id: 1, title: 'Penicillin Allergic Reaction', backgroundColor: '#F89797' },
        { id: 2, title: 'Peanuts Allergic Reaction', backgroundColor: '#FBCFCF' },
        { id: 3, title: 'Help Finding Wallet', backgroundColor: '#FCDADA'  },

      ];

      

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
                    textAlignVertical="top">
                    </TextInput>
                    <TouchableOpacity style={styles.button} onPress={handleCreate}>
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