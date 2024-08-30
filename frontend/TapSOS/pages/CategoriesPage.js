import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Touchable, Button  } from 'react-native';
import * as Font from 'expo-font';
import Card from '../components/Card';

export default function CategoriesPage({route, navigation}){

    const { cardData } = route.params;
    const categories = cardData.categories
    
    return(
        <ScrollView style={styles.container}>
            <View style={styles.infoRow}>
                <Text style={styles.header}>{cardData.title}</Text>
            </View>

            <View style={styles.cardRow}>
                {categories.map((card) => (
                <Card card={card}></Card>
                ))}
            </View>


        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingTop: 40,
      paddingHorizontal: 40,
      backgroundColor: 'white', // Background similar to the gradient
    },

    cardRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
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