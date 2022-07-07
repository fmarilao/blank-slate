import { createContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from './firebaseConfig.json';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const FirestoreContext = createContext({ db });

// High Order Component (HOC)
export const FirestoreContextProvider = ({ children }) => {
    const [joinedGameId, setJoinedGameId] = useState();
    return (
      <FirestoreContext.Provider value={{ db, joinedGameId, setJoinedGameId }}>
        {children}
      </FirestoreContext.Provider>
    );
};

export default FirestoreContext;