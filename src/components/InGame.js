import React, { useContext } from 'react';
import FirestoreContext from '../context/FirestoreContext';
import './InGame.css';
import Lobby from './Lobby';
import Turno from './Turno';

const InGame = () => {
    const { joinedGameId, gameData } = useContext(FirestoreContext);
    if (gameData.started) { 
        return <Turno />;
    }
    return <Lobby id={joinedGameId} players={gameData.players} />;
}

export default InGame;