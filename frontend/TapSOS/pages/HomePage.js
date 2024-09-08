import React, {useState, useEffect, useCallback} from 'react';
import { Text, View, StyleSheet, ScrollView, Touchable, TouchableOpacity  } from 'react-native';
import * as Font from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';
import Card from '../components/Card';
import { useNavigation } from '@react-navigation/native';
import CategoriesPage from './CategoriesPage';
import ParentCategoryCard from '../components/ParentCategoryCard';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

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

function transformCardData(apiData) {
    const backgroundColors = [
        '#F89797', '#FBCFCF', '#FCDADA', '#FFF076', '#A5D8FF', '#FFC1E3', '#F0D9FF'
    ];

    const customCards = apiData.map((item, index) => ({
        id: index + 1,
        title: item.title,
        backgroundColor: backgroundColors[index % backgroundColors.length], // Cycle through background colors
        text: item.content,
    }));

    return customCards;
}

export default function HomePage({navigation}) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [cards, setCards] = useState([]);  // State to store the cards

    useFocusEffect(
        useCallback(() => {
          const fetchCards = async () => {
            try {
              const response = await axios.get('http://192.168.86.25:8000/emergency-cards/');
              
              console.log(transformCardData(response.data));
              setCards(transformCardData(response.data));

            } catch (error) {
              console.error('Error fetching cards:', error);

            }
          };
    
          fetchCards();
        }, [])
      );


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


    const emergencyCards = [
        { id: 100, title: 'Medical Emergency', backgroundColor: '#FF6B6B', categories: [ {id: 1, title: 'Heart Attack', backgroundColor: '#F89797', text:"I AM MUTE. I AM HAVING AN ALLERGIC REACTION TO PENICILLIN. PLEASE CALL 995. YOU CAN FIND MY MEDICAL INFO HERE."}, {id: 2, title: 'Asthma', backgroundColor: '#F89797', text:"I AM MUTE. I AM HAVING AN ALLERGIC REACTION TO PENICILLIN. PLEASE CALL 995. YOU CAN FIND MY MEDICAL INFO HERE."}]},
        { id: 200, title: 'Physical Danger', backgroundColor: '#CADAFF', categories: [{id: 1, title: 'Physical Assault', backgroundColor: '#F89797', text:"I AM MUTE. I AM HAVING AN ALLERGIC REACTION TO PENICILLIN. PLEASE CALL 995. YOU CAN FIND MY MEDICAL INFO HERE."}, {id: 2, title: 'Sexual Assault', backgroundColor: '#F89797', text:"I AM MUTE. I AM HAVING AN ALLERGIC REACTION TO PENICILLIN. PLEASE CALL 995. YOU CAN FIND MY MEDICAL INFO HERE."}]},
        { id: 300, title: 'Fire Emergency', backgroundColor: '#FFF076'  },

      ];

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <EmergencyCard emergencyCards={emergencyCards}></EmergencyCard>
            <CustomCard customCards={cards}></CustomCard>
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