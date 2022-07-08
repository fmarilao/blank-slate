import React, { useContext } from 'react';
import FirestoreContext from '../context/FirestoreContext';
import PlayerContext from '../context/PlayerContext';
import './InGame.css';
import Lobby from './Lobby';
import Turno from './Turno';
import firebase from "firebase/app";

const InGame = () => {
    const { db, joinedGameId, gameData } = useContext(FirestoreContext);
    const { username, selectedWord} = useContext(PlayerContext);

    const currRound = gameData.rounds.length;
    const words = ['___botellas', 'abre_____', 'en_________', 'porta_____',  '_____magnetismo']
    
    //guardamos en selectedwords lo que nos devuelve firestore con el array de usuarios y sus palabras elegidas
    const selectedWords = gameData[`selectedWords_${currRound}`]

    // verificamos en el array de palabras elegidas si yo ya elegi o no
    // para habilitar o deshabilitar el boton de enviar
    const sent = selectedWord.find((w) => w.username === username);

    //iniciamos el juego por el creador
    const startGame = async () => {
        if (currRound === words.length) {
            await db.collection("games")
            .doc(joinedGameId)
            .update({
              ended: true,
            })
        } else {
            const guessWord = words[currRound]
            await db.collection("games").doc(joinedGameId).update({
                started: true,
                rounds: firebase.firestore.FieldValue.arrayUnion(guessWord)            
            });
        }
    }

    const sendWord = async () => {
        // si no envio aun la palabra dejamos enviar
        if (!sent) {
            // actualizamos en firestore un array llamado selectedWords_##nroderound con el username y la palabra elegida
            await db.collection("games").doc(joinedGameId).update({
              [`selectedWords_${currRound}`]: firebase.firestore.FieldValue.arrayUnion({
                username: username,
                selectedWord,
              })            
            });
        }
    }

    if (gameData.started) { 
        const currWord = gameData.rounds[gameData.rounds.length - 1];
        return <Turno id={joinedGameId} players={gameData.players} guessWord={currWord} sent={!!sent} onUpdate={sendWord} selected={selectedWords} />;
    }
    return <Lobby id={joinedGameId} players={gameData.players} onStart={startGame} />;
}

export default InGame;