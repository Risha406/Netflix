import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyASIKc_XJO0J85yQygn3jZq2K5XTyJqVfA",
  authDomain: "build-netflix-ott.firebaseapp.com",
  projectId: "build-netflix-ott",
  storageBucket: "build-netflix-ott.appspot.com",
  messagingSenderId: "598427040879",
  appId: "1:598427040879:web:19a036b1ac101fd70b619a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth= firebase.auth();

export {auth}   
export default db; 