// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBrHxSJGT9ZSjD6bBreRg9YpKalj9mDMis",
    authDomain: "authentication-6389e.firebaseapp.com",
    projectId: "authentication-6389e",
    storageBucket: "authentication-6389e.firebasestorage.app",
    messagingSenderId: "996775954723",
    appId: "1:996775954723:web:cfd63e786a3ca01d0c2496",
    measurementId: "G-JSM9JT21WW"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
