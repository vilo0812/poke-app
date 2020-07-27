import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDonoMCanr5q7WJp2uGeyba0wO82aXSdlM",
    authDomain: "proyecto-usuarios-436d7.firebaseapp.com",
    databaseURL: "https://proyecto-usuarios-436d7.firebaseio.com",
    projectId: "proyecto-usuarios-436d7",
    storageBucket: "proyecto-usuarios-436d7.appspot.com",
    messagingSenderId: "812925495",
    appId: "1:812925495:web:5e2063eba22ea5f0dc35b2",
    measurementId: "G-ES00TYNMC0"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export {firebase}