// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSTJqYszXJF8dXisUmblGuZ6a7blLyoGU",
  authDomain: "humanda-fea1a.firebaseapp.com",
  projectId: "humanda-fea1a",
  storageBucket: "humanda-fea1a.appspot.com", // Fixed storage URL
  messagingSenderId: "108577644535",
  appId: "1:108577644535:web:d4f8275101bb7c924498f2",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };
