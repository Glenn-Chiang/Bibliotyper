import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDS5CmETOcHGCCHsCfNI2nKqOvsJkCpTwc",
  authDomain: "bibliotyper-409213.firebaseapp.com",
  projectId: "bibliotyper-409213",
  storageBucket: "bibliotyper-409213.appspot.com",
  messagingSenderId: "622824310265",
  appId: "1:622824310265:web:0d4867ac490d35d041a928",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()