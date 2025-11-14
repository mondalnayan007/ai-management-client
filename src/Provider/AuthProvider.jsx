import  { useEffect, useState } from 'react';
import { createContext } from 'react';

import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';



export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();


    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true)
    
    const googleSignIn = ()=>{
        return signInWithPopup(auth, provider)
    } 

    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const logIn = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }
    const logOut =() =>{
       return signOut(auth);
    }

    const updateUser = (updateData)=>{
        return updateProfile(auth.currentUser , updateData);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false)
        });
        return ()=>{
            unsubscribe();
        };
    },[auth]);

    const authInfo = {
        user,
        setUser,
         createUser,
         logIn,
         logOut,
         loading,
         setLoading,
         updateUser,
         googleSignIn
    }

    

    return <AuthContext value={authInfo}>
                {children}
            </AuthContext>;
        
   
};

export default AuthProvider;