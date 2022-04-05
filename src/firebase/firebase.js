// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCfjGPnjynI3wLfuaqT8gs5hmqcRhRGDA",
  authDomain: "gestor-app-93d65.firebaseapp.com",
  projectId: "gestor-app-93d65",
  storageBucket: "gestor-app-93d65.appspot.com",
  messagingSenderId: "24511504579",
  appId: "1:24511504579:web:b2ae9331b7dc39f1d34276"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);