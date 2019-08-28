import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDAMkmxczlAs3KvoaOvsRri91Ent6d4O6g",
    authDomain: "crown-db-6492e.firebaseapp.com",
    databaseURL: "https://crown-db-6492e.firebaseio.com",
    projectId: "crown-db-6492e",
    storageBucket: "",
    messagingSenderId: "172003423243",
    appId: "1:172003423243:web:f1cf50c143875b4c"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
