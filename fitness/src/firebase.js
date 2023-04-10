// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx7cKlfZ79vZ63YPv5UhAW1q2l4zU11WM",
  authDomain: "project-9effe.firebaseapp.com",
  projectId: "project-9effe",
  storageBucket: "project-9effe.appspot.com",
  messagingSenderId: "850292032730",
  appId: "1:850292032730:web:2d214a37a07a0e2ef851e3",
  measurementId: "G-8MQ8YTFJTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);