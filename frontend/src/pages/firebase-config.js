
import { initializeApp } from "firebase/app";
import { getFirestore} from "@firebase/firestore";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyA3MhqbHGEHF812cPOMv7x4odgT-AOyZRU",
    authDomain: "refine-health-38bc2.firebaseapp.com",
    projectId: "refine-health-38bc2",
    storageBucket: "refine-health-38bc2.appspot.com",
    messagingSenderId: "261139956482",
    appId: "1:261139956482:web:9b382e301df1a00afc781b",
    measurementId: "G-CM1KTTT35T"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  export {auth,db} ;