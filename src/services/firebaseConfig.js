import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSYEmmaULJQ_1Iu9QausQ2Iwhfvx2Irao",
  authDomain: "multi-blog-52f92.firebaseapp.com",
  databaseURL:
    "https://multi-blog-52f92-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "multi-blog-52f92",
  storageBucket: "multi-blog-52f92.appspot.com",
  messagingSenderId: "224225470287",
  appId: "1:224225470287:web:b3636c9b951cb6d2eb073a",
};

// Initializing Firebase with our Firebase project configuration
const app = initializeApp(firebaseConfig);

// Firebase 'auth()' method to create a new instance of the Firebase 'auth' object
export const auth = getAuth(app);

// Initialize 'Cloud Firestore' and get a reference to the service
export const db = getFirestore(app);