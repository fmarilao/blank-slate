import logo from './logo.svg';
import './App.css';
import firebaseConfig from './firebaseConfig.json';

// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import { useEffect, useRef } from 'react';

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
