// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2bYT3SexgdZCYKZK0AOCJnwtibmbfk6c",
  authDomain: "fcm-appwrite.firebaseapp.com",
  projectId: "fcm-appwrite",
  storageBucket: "fcm-appwrite.appspot.com",
  messagingSenderId: "941750598723",
  appId: "1:941750598723:web:167e83c382ac35b431e8f6",
  measurementId: "G-VQG52TK90W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
