import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDwctdFL5g4ftJFWGPiHPYdMZCabmfibRk",
    authDomain: "alquiler-fa8a9.firebaseapp.com",
    projectId: "alquiler-fa8a9",
    storageBucket: "alquiler-fa8a9.firebasestorage.app",
    messagingSenderId: "39610418447",
    appId: "1:39610418447:web:5045a6dcb34779d6e1aa7a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
