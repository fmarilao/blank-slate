import React, { useContext } from 'react';
import FirestoreContext from '../context/FirestoreContext';
import './InGame.css';
import Lobby from './Lobby';
import Results from './Results';
import Turno from './Turno';
import firebase from "firebase/app";
import PlayerContext from '../context/PlayerContext';

const InGame = () => {
    const { db, joinedGameId, gameData } = useContext(FirestoreContext);
    const { username, selectedWord } = useContext(PlayerContext);

    const words = ['___botellas', 'porta_____', 'abre_____', '_____magnetismo', 'en_________']
    
    const guessWord = words[Math.floor(Math.random() * words.length)]
     
    const startGame = async () => {
        await db.collection("games").doc(joinedGameId).update({started: true, guessWord: guessWord});
    }

    const sendWord = async () => {
        await db.collection("games").doc(joinedGameId).update({
            selectedWords: firebase.firestore.FieldValue.arrayUnion({ 
              username: username,
              selectedWord,
            })
        });;
    }
    if (gameData.started) { 
        return <Turno id={joinedGameId} players={gameData.players} guessWord={guessWord} onUpdate={sendWord} />;
    }
    if (gameData.results) { 
        return <Results id={joinedGameId} players={gameData.players} onStart={startGame} />;
    }
    return <Lobby id={joinedGameId} players={gameData.players} onStart={startGame} />;
}

export default InGame;