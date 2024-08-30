import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity  } from 'react-native';
import * as Font from 'expo-font';

const PersonalInformation = ({userInfo}) => {
    return(
        <View style={styles.section}>
            <Text style={styles.header}>Personal Information</Text>

            <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                    <View style={styles.info}>
                        <Text style={styles.cardHeader}>{userInfo.name}  </Text>
                        <Text style={styles.value}>({userInfo.gender})</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.info}>
                        <Text style={styles.label}>Date of Birth: </Text>
                        <Text style={styles.value}>{userInfo.dob}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Age: </Text>
                        <Text style={styles.value}>{userInfo.age}</Text>
                    </View>
                </View>
                <View style={styles.info}>
                    <Text style={styles.label}>Address: </Text>
                    <Text style={styles.value}>{userInfo.address}</Text>    
                </View>
                <View style={styles.info}>
                    <Text style={styles.label}>Medical Condition: </Text>
                    <Text style={styles.value}>{userInfo.medicalConditions}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.label}>Allergies: </Text>
                    <Text style={styles.value}>{userInfo.allergies.join(', ')}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.label}>Medications: </Text>
                    <Text style={styles.value}>{userInfo.medications}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.label}>Blood Type: </Text>
                    <Text style={styles.value}>{userInfo.bloodType}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.label}>NOK: </Text>
                    <Text style={styles.value}>+65 {userInfo.emergencyContact.number} ({userInfo.emergencyContact.name})</Text>
                </View>
                
                
         
                
            </View>
        </View>
    )
}

export default function ProfilePage({navigation}){
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

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <PersonalInformation userInfo={userInfo}></PersonalInformation>

        </ScrollView>
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
  });