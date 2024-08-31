import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, Touchable, TouchableOpacity  } from 'react-native';
import * as Font from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';
import Card from '../components/Card';
import { useNavigation } from '@react-navigation/native';
import CategoriesPage from './CategoriesPage';
import ParentCategoryCard from '../components/ParentCategoryCard';


const CustomCard = ({customCards}) => {
    return (
        <View style={styles.section}>
            <View style={styles.infoRow}>
                <Text style={styles.header}>Custom Cards</Text>
            </View>
            
            <View
                style={styles.cardRow}
            >
                {customCards.map((card) => (
                    <Card card={card}>
                    </Card>
                ))}
            </View>
                
        </View>
    )
    
}

const EmergencyCard = ({emergencyCards}) => {
    
    return (
        <View style={styles.section}>
            <View style={styles.infoRow}>
                <Text style={styles.header}>Emergency</Text>
            </View>
            
            <View style={styles.cardRow}>
                {emergencyCards.map((card) => (
                <ParentCategoryCard card={card}></ParentCategoryCard>
                ))}
            </View>
                
        </View>
    )
    
}

export default function HomePage({navigation}) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
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

    const userInfo = {
        name:"John Doe",
        address:"123 School Street",
        age: 18,
        dob: "17/08/1945",
        gender: "Male",
        medicalConditions: ["Mutism"],
        allergies: ["Penicillin", "Peanuts"],
        medications: ["Palforzia"],
        bloodType: "A-",
        emergencyContact: {
            number: 81234567,
            name: "Dohn Joe"
        }
    }

    const customCards = [
        { id: 1, title: 'Penicillin Allergic Reaction', backgroundColor: '#F89797', text:"I AM MUTE. I AM HAVING AN ALLERGIC REACTION TO PENICILLIN. PLEASE CALL 995. YOU CAN FIND MY MEDICAL INFO HERE." },
        { id: 2, title: 'Peanuts Allergic Reaction', backgroundColor: '#FBCFCF', text:"I AM MUTE. I AM HAVING AN ALLERGIC REACTION TO PEANUTS. PLEASE CALL 995. YOU CAN FIND MY MEDICAL INFO HERE." },
        { id: 3, title: 'Help Finding Wallet', backgroundColor: '#FCDADA', text:"I AM MUTE. I AM MEWING RIGHT NOW. HELP!! CALL 999! CALL 995!"  },

      ];

    const emergencyCards = [
        { id: 1, title: 'Medical Emergency', backgroundColor: '#FF6B6B', categories: [ {id: 1, title: 'Heart Attack', backgroundColor: '#F89797', text:"I AM MUTE. I AM HAVING AN ALLERGIC REACTION TO PENICILLIN. PLEASE CALL 995. YOU CAN FIND MY MEDICAL INFO HERE."}, {id: 2, title: 'Asthma', backgroundColor: '#F89797', text:"I AM MUTE. I AM HAVING AN ALLERGIC REACTION TO PENICILLIN. PLEASE CALL 995. YOU CAN FIND MY MEDICAL INFO HERE."}]},
        { id: 2, title: 'Physical Danger', backgroundColor: '#CADAFF', categories: [{id: 1, title: 'Physical Assault', backgroundColor: '#F89797', text:"I AM MUTE. I AM HAVING AN ALLERGIC REACTION TO PENICILLIN. PLEASE CALL 995. YOU CAN FIND MY MEDICAL INFO HERE."}, {id: 2, title: 'Sexual Assault', backgroundColor: '#F89797', text:"I AM MUTE. I AM HAVING AN ALLERGIC REACTION TO PENICILLIN. PLEASE CALL 995. YOU CAN FIND MY MEDICAL INFO HERE."}]},
        { id: 3, title: 'Fire Emergency', backgroundColor: '#FFF076'  },

      ];

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <EmergencyCard emergencyCards={emergencyCards}></EmergencyCard>
            <CustomCard customCards={customCards}></CustomCard>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Landing')}><Text>LandingPage</Text></TouchableOpacity> */}
        </ScrollView>
        
    )

}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingHorizontal: 40,
      backgroundColor: 'white', // Background similar to the gradient
    },

    cardRow: {
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
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
  });