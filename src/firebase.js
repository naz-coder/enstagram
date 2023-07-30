import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyDLYfo1zXruIS1wodaaF7OdvGVgxLrcNXg",
    authDomain: "enstagram-app.firebaseapp.com",
    projectId: "enstagram-app",
    storageBucket: "enstagram-app.appspot.com",
    messagingSenderId: "604879011411",
    appId: "1:604879011411:web:94706fc98154dcb5c910a6",
    measurementId: "G-WR0XF9BLJD"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
