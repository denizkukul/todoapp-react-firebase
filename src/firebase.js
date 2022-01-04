import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_FU8VdSK7l6eyLSW8CNbz8gJMNiNMgvM",
  authDomain: "todoappa-react.firebaseapp.com",
  databaseURL: "https://todoappa-react-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todoappa-react",
  storageBucket: "todoappa-react.appspot.com",
  messagingSenderId: "145040121563",
  appId: "1:145040121563:web:0ac20bc1243b81a5b8f6fe"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };