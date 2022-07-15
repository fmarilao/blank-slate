import React, { useContext } from 'react';
import FirestoreContext from '../context/FirestoreContext';
import PlayerContext from '../context/PlayerContext';
import './InGame.css';
import Lobby from './Lobby';
import Turno from './Turno';
import firebase from "firebase/app";
import Results from './Results';

const InGame = () => {
    const { db, joinedGameId, gameData } = useContext(FirestoreContext);
    const { username, selectedWord} = useContext(PlayerContext);

    const currRound = gameData?.rounds?.length;
    const words = ['pay___', 'magic_____', 'better_________', 'dinner_____',  'front_____', 'light_____', 'chain_____',
    'cat_____', 'never_____', 'master_____', 'rock_____', 'evening_____', 'draw_____', 'golden_____', 'food_____',
    'silver_____', 'business_____', 'never_____', 'pig_____', 'door_____', 'sour_____', '_____drop', '_____control',
    '_____bell',  '_____walk',  '_____cycle']

    //guardamos en selectedwords lo que nos devuelve firestore con el array de usuarios y sus palabras elegidas
    const selectedWords = gameData[`selectedWords_${currRound}`];

    //verificamos si todos los jugadores ya completaron la palabra
    const pending = gameData.players.filter((p) => {
        //va a buscar en el array de firebase si coincide el usuario
        return !selectedWords?.find((w) => w.username === p.username)
    })

    // verificamos en el array de palabras elegidas si yo ya elegi o no
    // para habilitar o deshabilitar el boton de enviar
    const sent = selectedWords?.find((w) => w.username === username);

    //iniciamos el juego por el creador
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

    if(gameData.ended) {
        return <div>FIN {currRound} {words.length}</div>
    }

    if (gameData.started) {
        const currWord = gameData.rounds[gameData.rounds.length - 1];
        if (pending.length){
            return <Turno
             id={joinedGameId}
             players={gameData.players}
             guessWord={currWord}
             sent={!!sent}
             onUpdate={sendWord}
             selected={selectedWords} />;
        } else {
            return <Results 
             guessWord={currWord}
             onStart={startGame} />;
        }
    }
    return <Lobby id={joinedGameId} players={gameData.players} onStart={startGame} />;
}

export default InGame;