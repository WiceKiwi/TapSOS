import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for user data
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
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
  }); // State to hold user profile data
  const [loading, setLoading] = useState(true); // To manage loading state

  // Fetch user profile data once when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://192.168.86.25:8000/users/'); // Replace with your API endpoint
        const userData = response.data[0];
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
        
        setUser(formattedUserInfo);

      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
