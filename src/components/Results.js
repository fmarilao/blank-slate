import React, { useContext, useState } from "react";
import PlayerContext from "../context/PlayerContext";
import "./Results.css";

const Results = ({ id, players, onStart }) => {
    //facu1111
    // IdrXCDuWCawETlVMPlh8
    const { username } = useContext(PlayerContext);
    const currPlayer = players.find((player) => player.username === username);
    return (
      <div className="Main">
        <div>
          <h2>Turno</h2>
          <div className="Wrapper">
            <h3>game id:</h3>
            <p>{id}</p>
          </div>
          <div className="Wrapper">
            <h3>online players:</h3>
            <p>{players.length}</p>
          </div>
        </div>
        <div className="Wrapper">
          <p>la palabra era: {}</p>
        </div>
        <div>
          {currPlayer.creator ? (
            <button type="button" onClick={onStart}>
              Iniciar
            </button>
          ) : (
            <div>Esperando al creador del juego a que inicie</div>
          )}
        </div>
        <div className="Wrapper">
          <h2>Estado de respuestas:</h2>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Puntos actuales</th>
                  <th>Puntos Obtenidos</th>
                  <th>Palabra elegida</th>
                </tr>
              </thead>
              <tbody>
                {players.map((r, i) => (
                  <tr key={i}>
                    <td className="px-3 py-3" key={i}>
                      {players[i].username}
                    </td>
                    <td className="px-3 py-3" key={i}>
                      {players[i].username}
                    </td>
                    <td className="px-3 py-3" key={i}>
                      {players[i].username}
                    </td>
                    <td className="px-3 py-3" key={i}>
                      {players[i].username}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {currPlayer.creator ? (
            <div className="Wrapper">
              <div>
                <button type="button" onClick={() => {}}>
                  Nuevo Juego
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

export default Results;