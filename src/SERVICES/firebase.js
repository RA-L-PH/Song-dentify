import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpa2GYznkX2xhc58QWUEqntVEDEoa-Yx8",
  authDomain: "singfind-f8751.firebaseapp.com",
  projectId: "singfind-f8751",
  storageBucket: "singfind-f8751.appspot.com",
  messagingSenderId: "153614554551",
  appId: "1:153614554551:web:e7249498abacbea0600432",
  measurementId: "G-SGBN6R7X0T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, db };
