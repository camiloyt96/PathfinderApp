//import sdk from firebase
import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACbKR9KW6uulEIR1UTvi7UJGHtvUQmvkU",
  authDomain: "pathfinder-125cb.firebaseapp.com",
  projectId: "pathfinder-125cb",
  storageBucket: "pathfinder-125cb.firebasestorage.app",
  messagingSenderId: "908647857527",
  appId: "1:908647857527:web:e8547e5deb2eb1fc55b572",
  measurementId: "G-18HNDX1543"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export {app, analytics, auth, db};
export {serverTimestamp};
