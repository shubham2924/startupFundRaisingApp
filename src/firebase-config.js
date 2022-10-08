import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDTWNHG-yc3u81GlliMl4kVK0GrM4pkrHw",
  authDomain: "mock-project-623bf.firebaseapp.com",
  databaseURL: "https://mock-project-623bf-default-rtdb.firebaseio.com",
  projectId: "mock-project-623bf",
  storageBucket: "mock-project-623bf.appspot.com",
  messagingSenderId: "95075504071",
  appId: "1:95075504071:web:d9e31f2e5bc2e8ae5ed3e2",
  measurementId: "G-NW44CWTWK5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };