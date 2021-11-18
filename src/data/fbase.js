import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC9ajhIDG2SUEyNzsskzNBeyyCQ208lSHY",
    authDomain: "digitech-wiki-19224.firebaseapp.com",
    projectId: "digitech-wiki-19224",
    storageBucket: "digitech-wiki-19224.appspot.com",
    messagingSenderId: "110732201485",
    appId: "1:110732201485:web:6b89f67a9f5326235f0f44",
    measurementId: "G-ZBV1E43F6T"
};

const app = initializeApp(firebaseConfig);
export const authService = getAuth();
export const db = getFirestore(app);
export const storageService = getStorage();