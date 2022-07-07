import React from "react";
import "./Lobby.css";

const Lobby = ({ id, players }) => {
  //
  return (
    <div className="Main">
      <h2>Lobby</h2>
      <div className="Wrapper">
        <div>
          <h3>Game ID:</h3>
          <p>{id ? id : ""}</p>
        </div>
        <div>
          <h3>Online Players:</h3>
          {players?.map((p) => (
            <p key={p.username}>{p.username}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lobby;