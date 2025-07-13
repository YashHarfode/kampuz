import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase Config (from project settings)
const firebaseConfig = {
  apiKey: "AIzaSyC_O5sEd5po2iUhThmHIezjvIX-_snlqHA",
  authDomain: "internnest-ae0d1.firebaseapp.com",
  projectId: "internnest-ae0d1",
  storageBucket: "internnest-ae0d1.firebasestorage.app",
  messagingSenderId: "466190961492",
  appId: "1:466190961492:web:3fdabe44025a311facd6c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);