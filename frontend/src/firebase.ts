import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBpvB2oolmY0PvANlxQE_OYQ8o4DohtAnw",
  authDomain: "bibliotyper.firebaseapp.com",
  projectId: "bibliotyper",
  storageBucket: "bibliotyper.appspot.com",
  messagingSenderId: "310047123273",
  appId: "1:310047123273:web:895569280176addab69c98",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
