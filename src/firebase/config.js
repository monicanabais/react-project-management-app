import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDSvYlvychuZCTbZZEXmKvyQcDd75XMPV0",
  authDomain: "the-project-map.firebaseapp.com",
  projectId: "the-project-map",
  storageBucket: "the-project-map.appspot.com",
  messagingSenderId: "396762488058",
  appId: "1:396762488058:web:525585e0223c4218d67d43"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();


// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };