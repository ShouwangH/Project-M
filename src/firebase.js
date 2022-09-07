import "firebase/firestore";
import firebase from 'firebase/app'

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAF5OsSLs3Vk-LsyKFsEMaaoc4BXXMIHGE",
  authDomain: "api-project-354946788980.firebaseapp.com",
  databaseURL: "https://api-project-354946788980.firebaseio.com",
  projectId: "api-project-354946788980",
  storageBucket: "api-project-354946788980.appspot.com",
  messagingSenderId: "354946788980",
  appId: "1:354946788980:web:dd9498c06c752b8d83eb21"
});

// Initialize Firebase
export {firebaseConfig as firebase}