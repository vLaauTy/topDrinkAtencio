import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAES9HSLyMX5s1DxE6VJFMirU41Mg7YPJs",
  authDomain: "topdrinks-e8419.firebaseapp.com",
  projectId: "topdrinks-e8419",
  storageBucket: "topdrinks-e8419.appspot.com",
  messagingSenderId: "413661481410",
  appId: "1:413661481410:web:ee9d179dfe30bfa867ae5b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
