import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIxqOFORioBkNfEQY3VPOiTna8GMH3LRo",
  authDomain: "shree-studio-2026.firebaseapp.com",
  projectId: "shree-studio-2026",
  storageBucket: "shree-studio-2026.firebasestorage.app",
  messagingSenderId: "426622154849",
  appId: "1:426622154849:web:cc169758c00ddb24665220"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
