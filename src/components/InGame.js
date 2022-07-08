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

    const currRound = gameData.rounds.length;
    const words = ['___botellas', 'abre_____', 'en_________', 'porta_____',  '_____magnetismo']
    
    const selectedWords = gameData[`selectedWords_${currRound}`];
    const sent = selectedWords?.find((w) => w.username === username);

    const pending = gameData.players.filter((p)=> {
        return !selectedWords?.find((w) => w.username === p.username);
    })

    const startGame = async () => {
        if (currRound === words.length) {
            await db.collection("games")
            .doc(joinedGameId).update({
                ended: true, 
            });
        } else {
            const guessWord = words[currRound];
            await db.collection("games")
                .doc(joinedGameId).update({
                    started: true, 
                    rounds: firebase.firestore.FieldValue.arrayUnion(guessWord)
                });
        }
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

    if(gameData.ended) {
        return <div>FIN {currRound} {words.length}</div>
    }

    if (gameData.started) { 
        const currWord = gameData.rounds[gameData.rounds.length - 1];
        if (pending.length) {
            return <Turno 
                id={joinedGameId} 
                players={gameData.players}
                guessWord={currWord}
                sent={!!sent}
                selected={selectedWords}
                onUpdate={sendWord} />;   
        } else {
            return <Results 
                guessWord={currWord}
                onStart={startGame} />;
        }
    }
    return <Lobby id={joinedGameId} players={gameData.players} onStart={startGame} />;
}

export default InGame;