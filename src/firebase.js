import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC4x1Uaf6tguBnpmcrjQ1AvZ4Jsn_3aaTk",
    authDomain: "ecomerceplayabrava.firebaseapp.com",
    projectId: "ecomerceplayabrava",
    storageBucket: "ecomerceplayabrava.appspot.com",
    messagingSenderId: "9562827008",
    appId: "1:9562827008:web:243f15890c8c69b195abe5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  export {auth}