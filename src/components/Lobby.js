import React, { useContext } from "react";
import PlayerContext from "../context/PlayerContext";
import "./Lobby.css";

const Lobby = ({ id, players, onStart }) => {
    const { username } = useContext(PlayerContext);
    const currPlayer = players.find((player) => player.username === username);
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
                <div className="players">
                    {players?.map((p) => (
                        <div className="player" key={p.username}>
                            <img src={p.avatar} alt='avatar' />
                            <h3>{p.username}</h3>
                        </div>
                    ))}
                </div>
                </div>           
            </div>
            <div className="button">
                {currPlayer.creator ?
                    <button type="button" onClick={onStart}>Iniciar</button> :
                    <div>Esperando al creador del juego a que inicie</div>
                }
            </div> 
        </div>
    );
};

export default Lobby;