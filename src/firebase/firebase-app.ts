// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCX0hfk8GJCIeSe8dfyZDQdaLbVzxTJEB8",
    authDomain: "upsc-cse.firebaseapp.com",
    projectId: "upsc-cse",
    storageBucket: "upsc-cse.appspot.com",
    messagingSenderId: "105565270815",
    appId: "1:105565270815:web:ce2d9f227f379ee3fff62a"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);