import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCgfuy3kgkBEVOyZT556tZKKnSjWJGndNo",
  authDomain: "tecsus-59210.firebaseapp.com",
  databaseURL: "https://tecsus-59210-default-rtdb.firebaseio.com",
  projectId: "tecsus-59210",
  storageBucket: "tecsus-59210.appspot.com",
  messagingSenderId: "330289243582",
  appId: "1:330289243582:web:5c8b9e1502bba0642985ef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const rt = getDatabase(app);
