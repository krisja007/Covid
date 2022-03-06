// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDTtQXztEfrOgRu3J9mEAvQ2VlKwL3N4NY",
  authDomain: "labcovid-317c7.firebaseapp.com",
  projectId: "labcovid-317c7",
  storageBucket: "labcovid-317c7.appspot.com",
  messagingSenderId: "328054477111",
  appId: "1:328054477111:web:15b43b6b597c5b698a0ab2",
  measurementId: "G-5HZYSLDNQ6",
});

const db = getFirestore(firebaseApp);
export default db;
