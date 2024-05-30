import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBEtp38o27n7nooNJfJ712q0Fx8HqTfpkM",
  authDomain: "monkey-blogging-1de99.firebaseapp.com",
  projectId: "monkey-blogging-1de99",
  storageBucket: "monkey-blogging-1de99.appspot.com",
  messagingSenderId: "449353002650",
  appId: "1:449353002650:web:cf64337312f03a08963923"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)