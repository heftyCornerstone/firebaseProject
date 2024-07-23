import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApL3RA5M9StEXhvApIw4zVmTia-fgcJYQ",
  authDomain: "nwitter-reloaded-1ca32.firebaseapp.com",
  projectId: "nwitter-reloaded-1ca32",
  storageBucket: "nwitter-reloaded-1ca32.appspot.com",
  messagingSenderId: "212040557376",
  appId: "1:212040557376:web:a109db4cc6dc110563d0a5"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);