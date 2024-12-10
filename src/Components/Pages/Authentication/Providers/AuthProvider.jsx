
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { firestore,app } from '../../../../Firebase/firebase.config'; // Import Firestore config
//import { Firestore } from 'firebase/firestore/lite';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null); // Add userRole state
    const [loading, setLoading] = useState(true);

    // Create a new user and store their role in Firestore
    
    const createUser = async (email, password, role ) => {
      setLoading(true);
      try {
          const result = await createUserWithEmailAndPassword(auth, email, password);
          const newUser = result.user;
  
          // Save user role in Firestore
          await setDoc(doc(firestore, 'users', newUser.uid), {
              email: email,
              role: role,
          });
  
          setLoading(false);
          return result;
      } catch (error) {
          console.error("Error creating user:", error);
          setLoading(false);
          throw error; // Rethrow error to handle it in the component if needed
      }
  };
  

    // Sign in a user
    const signIn = async (email, password) => {
        setLoading(true);
        const result = await signInWithEmailAndPassword(auth, email, password);
        const currentUser = result.user;

        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(firestore, 'users', currentUser.uid));
        if (userDoc.exists()) {
            setUserRole(userDoc.data().role); // Set the user role
        }

        setLoading(false);
        return result;
    };

    const checkProfileExists = async (userId) => {
        try {
           const response = await fetch(`http://localhost:3000/checkProfile/${userId}`);
            const data = await response.json();
           // console.log(data.data);
            return data;  // Assuming your API returns { exists: true/false }
        } catch (error) {
            console.error("Error checking profile:", error);
            return false;  // Default to false if there's an error
        }
    };
    
    // Add this function in the AuthProvider for checking the profile in MongoDB


const logout = async () => {
    setLoading(true);
    console.log('Logout started');

    try {
        await signOut(auth);
        console.log('Firebase sign out successful');

        const response = await fetch('http://localhost:3000/tuitionHub/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();// Log the response message
        setUserRole(null);
        console.log('Logout completed');
    } catch (error) {
        console.error('Error during logout:', error);
    } finally {
        setLoading(false);
        console.log('Loading state set to false');
    }
};





    useEffect(() => {
       
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        
            setUser(currentUser.uid);
            if (currentUser) {
                // Fetch user role if logged in
                const userDoc = await getDoc(doc(firestore, 'users', currentUser.uid));
                if (userDoc.exists()) {
                    setUserRole(userDoc.data().role);
                }
            } else {
                setUserRole(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        setUser,
        userRole, // Provide userRole to the context
        loading,
        createUser,
        checkProfileExists,
        signIn,
        logout,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


