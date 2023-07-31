import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9pbNsY1w18qMfynJxFd7F4BToVycBmVY",
  authDomain: "ensta-gram-app.firebaseapp.com",
  projectId: "ensta-gram-app",
  storageBucket: "ensta-gram-app.appspot.com",
  messagingSenderId: "878824301988",
  appId: "1:878824301988:web:b734122307fc39aee8cd31",
  measurementId: "G-BS1QMR9NVZ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);

