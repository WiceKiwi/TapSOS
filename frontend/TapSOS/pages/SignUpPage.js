import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Platform, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name is required'),
    address: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Address is required'),
    medicalConditions: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Medical Condition is required'),
    gender: Yup.string().required('Gender is required'),  // Dropdown field
    dateOfBirth: Yup.date().required('Date of birth is required'),  // Date picker field
    NOKName: Yup.string().required('NOK name is required'),
    NOKNumber: Yup.string()
    .matches(/^\d{8}$/, "Phone number must be exactly 8 digits")
    .required('Phone number is required'),
    bloodType: Yup.string().required('Blood type is required')
  });

export default function SignUpPage() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const navigation = useNavigation();

  const onDateChange = (event, selectedDate) => {
    if (event.type === "set") { // This means the user pressed "OK"
      setShowDatePicker(false);
      if (selectedDate) {
        setDate(selectedDate);
        const formatted = `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}/${selectedDate.getFullYear()}`;
        setFormattedDate(formatted);
      }
    } else {
      setShowDatePicker(false); // User pressed "Cancel"
    }
  };

  const convertStringToArray = (inputString) => {
    return inputString.split(',').map(item => item.trim());
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          gender:'',
          address: '',
          bloodType:'',
          medicalConditions: '',
          allergies: [],
          medications: [],
          NOKName:'',
          NOKNumber:'',
          dateOfBirth: date,
        }}
        validationSchema={SignUpSchema}
        onSubmit={values => {
          // Handle form submission
          console.log(values);
          navigation.navigate('AccountCreation')
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View>
            <Text style={styles.header}>Enter your details</Text>
            
            <View style={styles.section}>
                <Text style={styles.label}>Full name</Text>
                <TextInput
                style={styles.textBoxShort}
                placeholder="Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                />
                {errors.name && touched.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity
                style={styles.textBoxShort}
                onPress={() => setShowDatePicker(true)}
                >
                <Text style={styles.dateText}>
                    {formattedDate || 'Select Date'}
                </Text>
                </TouchableOpacity>
                {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                    onDateChange(event, selectedDate);
                    setFieldValue('dateOfBirth', selectedDate);
                    }}
                />
                )}
                {errors.dateOfBirth && touched.dateOfBirth ? (
                <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
                ) : null}
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                style={styles.textBoxShort}
                placeholder="Address"
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
                />
                {errors.address && touched.address ? (
                <Text style={styles.errorText}>{errors.address}</Text>
                ) : null}
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Gender</Text>
                <RNPickerSelect
                onValueChange={value => setFieldValue('gender', value)}
                items={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                ]}
                style={pickerSelectStyles}
                placeholder={{
                    label: 'Select gender',
                    value: null,
                }}
                />
                {errors.gender && touched.gender ? (
                <Text style={styles.errorText}>{errors.gender}</Text>
                ) : null}
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Blood Type</Text>
                <RNPickerSelect
                onValueChange={value => setFieldValue('bloodType', value)}
                items={[
                    { label: 'A+', value: 'A+' },
                    { label: 'A-', value: 'A-' },
                    { label: 'B+', value: 'B+' },
                    { label: 'B-', value: 'B-' },
                    { label: 'AB+', value: 'AB+' },
                    { label: 'AB-', value: 'AB-' },
                    { label: 'O+', value: 'O+' },
                    { label: 'O-', value: 'O-' },
                ]}
                style={pickerSelectStyles}
                placeholder={{
                    label: 'Select blood type',
                    value: null,
                }}
                />
                {errors.bloodType && touched.bloodType ? (
                <Text style={styles.errorText}>{errors.bloodType}</Text>
                ) : null}
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Medical Condition</Text>
                <TextInput
                style={styles.textBoxShort}
                placeholder="'Mutism'"
                onChangeText={handleChange('medicalConditions')}
                onBlur={handleBlur('medicalConditions')}
                value={values.medicalConditions}
                />
                {errors.medicalConditions && touched.medicalConditions ? (
                <Text style={styles.errorText}>{errors.medicalConditions}</Text>
                ) : null}
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Allergies, if any</Text>
                <TextInput
                style={styles.textBoxLong}
                placeholder="e.g. Peanuts, Penicillin, etc"
                onChangeText={(text) => {
                  const allergiesArray = convertStringToArray(text);
                  setFieldValue('allergies', allergiesArray);
                }}
                onBlur={handleBlur('allergies')}
                value={values.allergies.join(', ')} // Convert back to string for display
                textAlignVertical='top'
                />
                {errors.allergies && touched.allergies ? (
                <Text style={styles.errorText}>{errors.allergies}</Text>
                ) : null}
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Medications, if any</Text>
                <TextInput
                style={styles.textBoxLong}
                placeholder="e.g. Palforzia, etc"
                onChangeText={(text) => {
                  const medicationsArray = convertStringToArray(text);
                  setFieldValue('medications', medicationsArray); // Assuming you are using Formik
                }}
                onBlur={handleBlur('medications')}
                value={values.medications.join(', ')} // Convert back to string for display
                textAlignVertical='top'
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>NOK Name</Text>
                <TextInput
                style={styles.textBoxShort}
                placeholder="Name"
                onChangeText={handleChange('NOKName')}
                onBlur={handleBlur('NOKName')}
                value={values.NOKName}
                textAlignVertical='top'
                />
                {errors.NOKName && touched.NOKName ? (
                <Text style={styles.errorText}>{errors.NOKName}</Text>
                ) : null}
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>NOK Phone Number</Text>
                <TextInput
                style={styles.textBoxShort}
                placeholder="01234567"
                onChangeText={handleChange('NOKNumber')}
                onBlur={handleBlur('NOKNumber')}
                value={values.NOKNumber}
                textAlignVertical='top'
                />
                {errors.NOKNumber && touched.NOKNumber ? (
                <Text style={styles.errorText}>{errors.NOKNumber}</Text>
                ) : null}
            </View>
        

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 40,
    paddingBottom: 50,
    backgroundColor: '#fff',
  },

  button: {
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: '#F89797',
    paddingHorizontal: 70,
    paddingVertical: 10,
    marginBottom: 50,

  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Inter-bold',
    textAlign: 'center',
  },

  section: {
    marginBottom: 5,
  },

  header: {
    fontSize: 22,
    fontFamily: 'Inter-bold',
    marginBottom: 5,
  },

  label: {
    fontSize: 16,
    fontFamily: 'Inter-bold',
  },

  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

const pickerSelectStyles = {
    inputIOS: {
      borderRadius: 15,
      backgroundColor: '#1111',
      fontSize: 14,
      fontFamily: 'Inter',
      paddingHorizontal: 10,
      paddingVertical: 10,
      color: '#000', // Text color for iOS
    },

    inputAndroid: {
      borderRadius: 15,
      backgroundColor: '#1111',
      fontSize: 14,
      fontFamily: 'Inter',
      paddingHorizontal: 10,
      paddingVertical: 10,
      color: '#000', // Text color for Android
    },
    placeholder: {
      color: '#999', // Placeholder text color
    },
  };
  