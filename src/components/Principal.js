import React, { useContext, useState } from 'react'
import './Principal.css';
import Modal from "react-modal";
import firebase from "firebase/app";
import FirestoreContext from '../context/FirestoreContext';
import PlayerContext from '../context/PlayerContext';

const avatars = [
  "https://robohash.org/sitquibusdamautem.png?size=100x100&set=set1",
  "https://robohash.org/assumendauttempore.png?size=100x100&set=set1",
  "https://robohash.org/evenietquosvoluptatem.png?size=100x100&set=set1",
  "https://robohash.org/suntnequefugiat.png?size=100x100&set=set1",
  "https://robohash.org/quicorporistenetur.png?size=100x100&set=set1",
  "https://robohash.org/repellatiustodolore.png?size=100x100&set=set1"
];

const Principal = () => {
  const [avatar, setAvatar] = useState(avatars[Math.floor(Math.random() * avatars.length)]);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const [gameId, setGameId] = useState();
  const { db, setJoinedGameId } = useContext(FirestoreContext);
  const { setUsername } = useContext(PlayerContext);

  const startGame = async () => {
    const res = await db
      .collection('games')
      .add({
        players: [{ username: user, avatar, creator: true }], 
        started: false,
        rounds: []
      });
    setUsername(user);
    setJoinedGameId(res.id);
  };

  const joinGame = async () => {
    const res = await db.collection("games").doc(gameId).get();
    const inGame = res.data().players.find((player) => player.username === user);
    console.log("inGame", inGame)
    if(res.exists) {
      if(!inGame) {
        await db
        .collection('games')
        .doc(gameId)
        .update({
          players: firebase.firestore.FieldValue.arrayUnion({ 
            username: user, avatar, creator: false
          })
        });
      }
      setUsername(user);
      setJoinedGameId(gameId);
    } else {
      alert("Invalid Game Id")
    }
  };

  return (
    <div className="App"> 
        <div className="Wrapper">
          <img src={avatar} alt='avatar' onClick={() => setIsOpen(true)} />
          <button type="button" onClick={() => setIsOpen(true)}>Cambiar</button>
        </div>
        <div className="Wrapper">
            <h2>Usuario</h2>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <button
              type="button"
              onClick={() => startGame()}
            >
              Nuevo Juego
            </button>
        </div>
        <div className="Wrapper">
        <h2>Game Id</h2>
            <input
              type="text"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
            />
            <button
              type="button"
              onClick={() => joinGame()}
            >
              Unirse al Juego
            </button>
        </div>        
      <Modal
        isOpen={isOpen}
        onRequestClose={()=> setIsOpen(false)}
      >
        <h1>Select your avatar</h1>
        <div>
          {avatars.map((avatarMap) => (
            <img
              key={avatarMap}
              className={avatarMap === avatar ? "Selected" : null}
              src={avatarMap}
              alt="avatar"
              onClick={()=> {
                setAvatar(avatarMap)
              }}
              />
          ))}
        </div>
        <button 
          type="button"
          onClick={() => setIsOpen(false)}
         >
          Cancelar
        </button>
        <button 
          type="button"
          onClick={() => setIsOpen(false)}
         >
          Seleccionar
        </button>
      </Modal>
    </div>
  )
}

export default Principal