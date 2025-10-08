// src/Firebase/init.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBw6xGu0JMz0xeomy_egr7YlBvAyPV1sSk",
  authDomain: "week7-wenshi.firebaseapp.com",
  projectId: "week7-wenshi",
  storageBucket: "week7-wenshi.firebasestorage.app",
  messagingSenderId: "477602880461",
  appId: "1:477602880461:web:76f5f9682540e3e5658284",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
