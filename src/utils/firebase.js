
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8CYGM4lmhNrILkMwGiH8khxTTg4yY3Ic",
  authDomain: "netflixgpt-d255f.firebaseapp.com",
  projectId: "netflixgpt-d255f",
  storageBucket: "netflixgpt-d255f.firebasestorage.app",
  messagingSenderId: "604900548576",
  appId: "1:604900548576:web:4e708eeb07a0a211811585",
  measurementId: "G-HK8YKM5T7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();