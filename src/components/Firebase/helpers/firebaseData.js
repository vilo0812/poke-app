import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD6UFZSfTt18ZvryrBSabE9jXpO9fAtESo",
    authDomain: "usuario-bb0e1.firebaseapp.com",
    databaseURL: "https://usuario-bb0e1.firebaseio.com",
    projectId: "usuario-bb0e1",
    storageBucket: "usuario-bb0e1.appspot.com",
    messagingSenderId: "1038801013036",
    appId: "1:1038801013036:web:63c5372f2700b725cc8489",
    measurementId: "G-6MWP8BYENH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export {auth, firebase, db, storage}