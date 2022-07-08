import React, { useContext } from "react";
import PlayerContext from "../context/PlayerContext";
import "./Turno.css";

const Turno = ({ id, players, guessWord, sent, onUpdate, selected }) => {
  const { selectedWord, setSelectedWord } = useContext(PlayerContext)

  const renderPlayerStatus = () => {
    return players.map((p) => {
      // recorre todos los players
      // verificamos si el player ya mando la palabra
      // segun el array de selectedwords
      const sent = selected.find((w)=> w.username === p.username)
      return (
        <div>{p.username} {sent ? "OK" : "Pending"} </div>
      )
    })
  }

  return (
    <div className="Main">
      <h2>Turno</h2>
      <div>
        <h3>game id:</h3>
        <p>{id}</p>
      </div>
      <div>
        <h3>online players:</h3>
        <p>{players.length}</p>
      </div>
      <div>
        la palabra a completar es: {guessWord}
      </div>
     {!sent ? (
      <div>
        <input
          type="text"
          value={selectedWord}
          onChange={(e) => setSelectedWord}
        />
        <button
          type="button"
          onClick={onUpdate}
          >
          Enviar  
          </button>
      </div>
     ) : renderPlayerStatus()}
  </div>
  );
};

export default Turno;