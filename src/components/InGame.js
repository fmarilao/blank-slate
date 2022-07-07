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
    const currRound = gameData.rounds.length;
    const selectedWords = gameData[`selectedWords_${currRound}`];
    const sent = selectedWords.find((w) => w.username === username);

    const pending = gameData.players.filter((p)=> {
        return !selectedWords.find((w) => w.username === p.username);
    })

    const startGame = async () => {
        await db.collection("games")
            .doc(joinedGameId).update({
                started: true, 
                rounds: [guessWord]
            });
    }

    const sendWord = async () => {
        if (!sent) {
            await db.collection("games").doc(joinedGameId).update({
                [`selectedWords_${currRound}`]: firebase.firestore.FieldValue.arrayUnion({ 
                  username: username,
                  selectedWord,
                })
            });
        }
    }

    if (gameData.started) { 
        if (pending.length) {
            const currWord = gameData.rounds[gameData.rounds.length - 1];
            return <Turno 
                id={joinedGameId} 
                players={gameData.players}
                guessWord={currWord}
                sent={!!sent}
                selected={selectedWords}
                onUpdate={sendWord} />;   
        } else {
            return <Results id={joinedGameId} players={gameData.players} onStart={startGame} />;
        }
    }
    return <Lobby id={joinedGameId} players={gameData.players} onStart={startGame} />;
}

export default InGame;