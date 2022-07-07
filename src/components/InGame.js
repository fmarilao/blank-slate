import React, { useContext } from 'react';
import FirestoreContext from '../context/FirestoreContext';
import './InGame.css';
import Lobby from './Lobby';
import Turno from './Turno';

const InGame = () => {
    const { db, joinedGameId, gameData } = useContext(FirestoreContext);

    const startGame = async () => {
        await db.collection("games").doc(joinedGameId).update({started: true});
    }
    if (gameData.started) { 
        return <Turno />;
    }
    return <Lobby id={joinedGameId} players={gameData.players} onStart={startGame} />;
}

export default InGame;