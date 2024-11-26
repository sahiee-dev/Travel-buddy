import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBdQ025jG0kaWezZe5qEM6COWpzwSUU5Xs",
  authDomain: "itinerary-planner-7a01b.firebaseapp.com",
  projectId: "itinerary-planner-7a01b",
  storageBucket: "itinerary-planner-7a01b.firebasestorage.app",
  messagingSenderId: "116575710829",
  appId: "1:116575710829:web:d86d155cd96d744b595964",
  measurementId: "G-EG9ZFPTDB6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
