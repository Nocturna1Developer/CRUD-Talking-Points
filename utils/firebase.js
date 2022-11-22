// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// gets information about current user
import { getAuth } from 'firebase'; 
// The data base we retrive from write to etc
import { getFireStore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC91XmPxxVUM-Gsx7XJWfqbQiuxlaom7DA",
    authDomain: "talking-points-98151.firebaseapp.com",
    projectId: "talking-points-98151",
    storageBucket: "talking-points-98151.appspot.com",
    messagingSenderId: "1053776153568",
    appId: "1:1053776153568:web:49bd078022709f421fb985",
    measurementId: "G-4R6221V7GQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// invoking the import statement
export const auth = getAuth();