import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBny5KPQWcIqwynawDw942GuoT8RHS6tl4",
  authDomain: "pantry-panda.firebaseapp.com",
  projectId: "pantry-panda",
  storageBucket: "pantry-panda.appspot.com",
  messagingSenderId: "705957145904",
  appId: "1:705957145904:web:eaf5d945a45bdc2d236cf5",
  measurementId: "G-P8DFHGDR12"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)