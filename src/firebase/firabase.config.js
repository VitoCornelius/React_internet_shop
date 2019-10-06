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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    console.log(snapShot);

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set(
                {
                    displayName, email, createdAt, ...additionalData
                }
            )
        } catch(error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
};

export const addCOllectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => { //iterate and add all to the firebase db 
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    })

    return await batch.commit(); //await to end ! 
}

export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
        const {title, items} = doc.data();
        return {
            routName: encodeURI(title.toLowerCase()),
            id : doc.id,
            title, 
            items
        }
    })

    return transformedCollections.reduce((accumulator, collection) => { //create a new object that has keys corresponding to the colection name
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
