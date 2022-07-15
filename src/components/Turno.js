import React, { useContext } from "react";
import PlayerContext from "../context/PlayerContext";
import "./Turno.css";

const Turno = ({ id, players, guessWord, onUpdate, sent, selected }) => {
  const { selectedWord, setSelectedWord } = useContext(PlayerContext);

  const renderPlayerStatus = () => {
    return players.map((p)=> {
      // recorre todos los players
      // verificamos si el player ya mando la palabra
      // segun el array de selectedwords
      const sent = selected.find((w) => w.username === p.username);
      return (
        <div>{p.username} {sent ? "OK" : "Pending"}</div>
      );
    })
  }

  return (
    <div className="Main">
      <div>
        <h2>Round</h2>
        <div>
          <h3>Game id:</h3>
          <p>{id}</p>
        </div>
        <div>
          <h3>Online Players:</h3>
          <p>{players.length}</p>
        </div>
      </div>
      <div>
        <p>WORD:</p>
        <h1>{guessWord}</h1>
      </div>
        { !sent ? 
        (
          <div>
            <p>complete your word</p>
            <input
              type="text"
              value={selectedWord}
              onChange={(e) => setSelectedWord(e.target.value)}
            />
            <button type="button" onClick={onUpdate}>
              Send
            </button>
          </div>
        ) : renderPlayerStatus() }
      
    </div>
  );
};

export default Turno;