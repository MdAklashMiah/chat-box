import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhbUJNlp3Ar_I3wzma2DBeG1v7LHz20-E",
  authDomain: "chat-box-747e7.firebaseapp.com",
  projectId: "chat-box-747e7",
  storageBucket: "chat-box-747e7.appspot.com",
  messagingSenderId: "425804143243",
  appId: "1:425804143243:web:8c0e7281252e93f555528e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// Export the instances
export { app, auth, db };