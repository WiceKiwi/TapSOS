import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView  } from 'react-native';
import * as Font from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';

const PersonalInformation = ({userInfo}) => {
    return(
        <View style={styles.section}>
            <Text style={styles.header}>Personal Information</Text>
            <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                    <View style={styles.info}>
                        <Text style={styles.label}>Name: </Text>
                        <Text style={styles.value}>{userInfo.name}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Age: </Text>
                        <Text style={styles.value}>{userInfo.age}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.info}>
                        <Text style={styles.label}>Address: </Text>
                        <Text style={styles.value}>{userInfo.address}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Sex: </Text>
                        <Text style={styles.value}>{userInfo.sex}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.info}>
                        <Text style={styles.label}>DOB: </Text>
                        <Text style={styles.value}>{userInfo.dob}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Blood Type: </Text>
                        <Text style={styles.value}>{userInfo.bloodType}</Text>
                    </View>
                </View>  
                <View style={styles.info}>
                    <Text style={styles.label}>Medical Condition: </Text>
                    <Text style={styles.value}>{userInfo.medicalConditions}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.label}>Allergies: </Text>
                    <Text style={styles.value}>{userInfo.allergies}</Text>
                </View>
                
                <View style={styles.info}>
                    <Text style={styles.label}>Emergency Contact: </Text>
                    <Text style={styles.value}>+65 {userInfo.emergencyContact.number}</Text>
                </View>
            </View>
        </View>
    )
}

const CustomCard = ({customCards}) => {
    return (
        <View style={styles.section}>
            <View style={styles.infoRow}>
                <Text style={styles.header}>Custom Cards</Text>
                <Text style={styles.clickable}>Create New Card</Text>
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

const EmergencyCard = ({emergencyCards}) => {
    
    return (
        <View style={styles.section}>
            <View style={styles.infoRow}>
                <Text style={styles.header}>Emergency</Text>
                {/* <Text style={styles.clickable}>Create New Card</Text> */}
            </View>
            
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.cardRow}
            >
                {emergencyCards.map((card) => (
                <View key={card.id} style={[styles.card, { backgroundColor: `${card.backgroundColor}` }]}>
                    <Text style={styles.cardText}>{card.title}</Text>
                </View>
                ))}
            </ScrollView>
                
        </View>
    )
    
}

export default function HomePage() {
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
        sex: "M",
        medicalConditions: ["Mutism"],
        allergies: ["Penicillin, Peanuts"],
        bloodType: "A-",
        emergencyContact: {
            number: 81234567,
            name: "Dohn Joe"
        }
    }

    const customCards = [
        { id: 1, title: 'Penicillin Allergic Reaction', backgroundColor: '#F89797' },
        { id: 2, title: 'Peanuts Allergic Reaction', backgroundColor: '#FBCFCF' },
        { id: 3, title: 'Help Finding Wallet', backgroundColor: '#FCDADA'  },

      ];

    const emergencyCards = [
        { id: 1, title: 'Medical Emergency', backgroundColor: '#FF6B6B'},
        { id: 2, title: 'Physical Danger', backgroundColor: '#CADAFF' },
        { id: 3, title: 'Fire Emergency', backgroundColor: '#FFF076'  },

      ];

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <PersonalInformation userInfo={userInfo}></PersonalInformation>
            <CustomCard customCards={customCards}></CustomCard>
            <EmergencyCard emergencyCards={emergencyCards}></EmergencyCard>
        </ScrollView>
        
    )

}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 40,
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
        backgroundColor: '#F89797',
        paddingVertical: 5,
        paddingHorizontal: 10,
        
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
      height: 150,
      width: 150,
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