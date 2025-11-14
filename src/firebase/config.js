// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// 🔥 Replace this with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD2oTPzW-ga7LWU1Vd6pK06Cozaw5uJWqA",
  authDomain: "event-planner-919ef.firebaseapp.com",
  projectId: "event-planner-919ef",
  storageBucket: "event-planner-919ef.firebasestorage.app",
  messagingSenderId: "339257027163",
  appId: "1:339257027163:web:b335a9b3e1227325aced7e",
  measurementId: "G-VBBTQMB38G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
