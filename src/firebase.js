import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var firebaseConfig = {
  apiKey: "AIzaSyABUXcsgXPlOAM_9cLcs6LmgFFjZbO42pA",
  authDomain: "react-slack-clone-eb5fc.firebaseapp.com",
  databaseURL: "https://react-slack-clone-eb5fc.firebaseio.com",
  projectId: "react-slack-clone-eb5fc",
  storageBucket: "react-slack-clone-eb5fc.appspot.com",
  messagingSenderId: "578996466412",
  appId: "1:578996466412:web:2dada159c24b463e24ebc9",
  measurementId: "G-KSJGVDR8F2"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
