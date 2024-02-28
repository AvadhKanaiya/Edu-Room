import firebase from 'firebase'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCkLZ2SiaaXD6axPhL_x9NK7Dg1Wmsyayk",
    authDomain: "edu--event-room.firebaseapp.com",
    projectId: "edu--event-room",
    storageBucket: "edu--event-room.appspot.com",
    messagingSenderId: "286883764761",
    appId: "1:286883764761:web:0fe894bd56a66a7abaa888"
}
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage()
export { auth, provider, storage };
export default db;