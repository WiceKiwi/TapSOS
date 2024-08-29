import React from 'react';
import { Text, View, StyleSheet, ScrollView  } from 'react-native';

const PersonalInformation = () => {
    return(
        <ScrollView contentContainerStyle={styles.container}>
        {/* Personal Information Section */}
        <View style={styles.section}>
            <Text style={styles.header}>Personal Information</Text>
            <View style={styles.infoRow}>
                <Text style={styles.label}>Name: </Text>
                <Text style={styles.value}>John Doe</Text>
                <Text style={styles.label}>Age: </Text>
                <Text style={styles.value}>18</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.label}>Address: </Text>
                <Text style={styles.value}>123 School Street</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.label}>Sex: </Text>
                <Text style={styles.value}>M</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.label}>Medical Condition: </Text>
                <Text style={styles.value}>Mutism</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.label}>Allergies: </Text>
                <Text style={styles.value}>Penicillin, Peanuts</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.label}>Blood Type: </Text>
                <Text style={styles.value}>A-</Text>
            </View>
        </View>

        {/* Custom Cards Section */}
        <View style={styles.section}>
            <Text style={styles.header}>Custom Cards</Text>
            <View style={styles.cardRow}>
            <View style={[styles.card, { backgroundColor: '#FF6B6B' }]}>
                <Text style={styles.cardText}>Penicillin Allergic Reaction</Text>
            </View>
            <View style={[styles.card, { backgroundColor: '#FF6B6B' }]}>
                <Text style={styles.cardText}>Peanuts Allergic Reaction</Text>
            </View>
            <View style={[styles.card, { backgroundColor: '#FFB6B9' }]}>
                <Text style={styles.cardText}>Help finding wallet</Text>
            </View>
            </View>
        </View>

        {/* Emergency Section */}
        <View style={styles.section}>
            <Text style={styles.header}>Emergency</Text>
            <View style={styles.cardRow}>
            <View style={[styles.card, { backgroundColor: '#FF6B6B' }]}>
                <Text style={styles.cardText}>Medical Emergency</Text>
                {/* Add an icon here if needed */}
            </View>
            <View style={[styles.card, { backgroundColor: '#6BCBFF' }]}>
                <Text style={styles.cardText}>Physical Danger</Text>
                {/* Add an icon here if needed */}
            </View>
            </View>
        </View>
    </ScrollView>
    )
}

export default function HomePage() {
    return(
        <PersonalInformation></PersonalInformation>
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
        marginBottom: 20,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    infoRow: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    value: {
      fontSize: 16,
      fontWeight: '600',
    },
    label: {
      fontSize: 16,
      fontWeight: '400',
      color: 'black',
    },
    spacer: {
      marginLeft: 20,
    },
    cardRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    card: {
      flex: 1,
      padding: 15,
      marginRight: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardText: {
      color: 'black',
      fontWeight: '600',
      textAlign: 'center',
    },
  });