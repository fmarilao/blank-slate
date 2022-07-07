import firebaseConfig from './firebaseConfig.json';
// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import { useEffect, useRef } from 'react';
import Principal from './components/Principal';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function App() {
  const subscription = useRef();
  const subscribeToFirestore = async () => {
    if (subscription.current) return;
    const gamesDb = db.collection("games");
    subscription.current = gamesDb.doc("D7DGcWqHk173BDCOdmnD").onSnapshot((doc) => {
      console.log(doc.data());
    });
  }

  useEffect(() => {
    subscribeToFirestore();
  }, []);

  return (
    <div>
      <Principal />
    </div>
  );
}

export default App;
