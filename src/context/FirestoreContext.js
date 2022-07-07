import { createContext, useEffect, useRef, useState } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from './firebaseConfig.json';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const FirestoreContext = createContext({ db });

// High Order Component (HOC)
export const FirestoreContextProvider = ({ children }) => {
    const [joinedGameId, setJoinedGameId] = useState();
    const [gameData, setGameData] = useState();
    const subscription = useRef();

    const subscribeToFirestore = async () => {
      if (subscription.current) return;
      const gamesDb = db.collection("games");
      subscription.current = gamesDb.doc(joinedGameId).onSnapshot((doc) => {
        setGameData(doc.data());
      });
    }

    useEffect(() => {
      if(joinedGameId) {
        subscribeToFirestore();
      }
    }, [joinedGameId])

    return (
      <FirestoreContext.Provider value={{ db, joinedGameId, setJoinedGameId, gameData }}>
        {children}
      </FirestoreContext.Provider>
    );
};

export default FirestoreContext;