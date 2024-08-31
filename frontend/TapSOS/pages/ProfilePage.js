import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity  } from 'react-native';
import * as Font from 'expo-font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

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
                    <Text style={styles.value}>+65 {userInfo.NOKNumber} ({userInfo.NOKName})</Text>
                </View>
                
                
         
                
            </View>
        </View>
    )
}

export default function ProfilePage({navigation}){

    const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    age: 0,
    dob: "",
    gender: "",
    medicalConditions: "",
    allergies: [],
    medications: [],
    bloodType: "",
    NOKName: "",
    NOKNumber: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://192.168.86.25:8000/users/');  // Replace with your actual IP and endpoint

        const userData = response.data[0];  // Assuming response data is an array with one user object

        console.log('User Data:', userData);  // Log the user data to inspect it

        // Safely extract the data from nested objects
        const formattedUserInfo = {
          name: userData.name,
          address: userData.address,
          age: userData.age,
          dob: formatDate(userData.DOB),  // Format DOB from YYYY-MM-DD to DD/MM/YYYY
          gender: userData.gender,
          medicalConditions: userData.medical_conditions.map(cond => cond.condition).join(', '),  // Extract conditions and join them into a string
          allergies: userData.allergies.map(allergen => allergen.allergen),  // Extract allergens into an array
          medications: userData.medications ? userData.medications.map(med => med.medication || "") : [],  // Map medications if they exist
          bloodType: userData.blood_type,
          NOKName: userData.emergency_contact_name,
          NOKNumber: userData.emergency_contact_number,
        };

        setUserInfo(formattedUserInfo);
        console.log('Formatted User Info:', formattedUserInfo);  // For debugging

      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

    const handleEdit = () => {
        console.log("edited")
    }

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <PersonalInformation userInfo={userInfo}></PersonalInformation>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile', {userData : userInfo})}>
                <Text style={styles.buttonText}>
                    Edit
                </Text>
            </TouchableOpacity>
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
        marginBottom: 10,

    },

    editButton:{
        alignItems: 'center',
        paddingTop: 15,
        borderRadius: 50,
        backgroundColor: '#1111',
        paddingHorizontal: 15,
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

    
    value: {
      fontSize: 16,
      fontFamily: 'Inter-bold',
    },

    label: {
      fontSize: 16,
      fontFamily: 'Inter',
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
  });