import React, { useContext, useEffect, useState } from "react";
import FirestoreContext from "../context/FirestoreContext";
import PlayerContext from "../context/PlayerContext";
import "./Results.css";

const Results = ({ onStart, guessWord }) => {
    const { username } = useContext(PlayerContext);
    const { joinedGameId, gameData } = useContext(FirestoreContext);
    const { players } = gameData;
    const currPlayer = players.find((player) => player.username === username);
    const [scores, setScores] = useState({});
    const [globals, setGlobals] = useState({});

    const currRound = gameData.rounds.length;
    const lastRound = gameData[`selectedWords_${currRound}`];

    const getRoundScores = (round) => {
      const results = {};
      const selected = gameData[`selectedWords_${round}`];
      selected.forEach(({ selectedWord}) => {
        if(selectedWord in results) results[selectedWord]++;
        else results[selectedWord] = 1;
      });

      // En base a las coincidencias, calculamos el score de cada user
      const scores = {};
      selected.forEach(({ selectedWord, username}) => {
        let wordPoints = 0;
        if (results[selectedWord] > 2) { 
          wordPoints = 1;
        }
        if (results[selectedWord] === 2) {
          wordPoints = 3;
        }
        scores[username] = wordPoints;
      });
      return scores;
    }

    useEffect(() => {
      // Contamos cuantas veces aparece cada palabra en las selected words
      const scores = getRoundScores(currRound);
      setScores(scores)

      const globalScore = getRoundScores(currRound);
      for (let i = 1; i < currRound; i++) {
        const s = getRoundScores(i);
        Object.keys(s).forEach((uname) => {
          globalScore[uname] += s[uname];
        })
      }
      setGlobals(globalScore);
    }, []);

    return (
      <div className="Main">
        <div>
          <h2>Results</h2>
          <div>
            <h3>Game id:</h3>
            <p>{joinedGameId}</p>
          </div>
          <div>
            <h3>Online players:</h3>
            <p>{players.length}</p>
          </div>
        </div>
        <div>
          <p>WORD: {guessWord}</p>
        </div>
        <div>
          <h2>User points:</h2>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Round Points</th>
                  <th>Total Points</th>
                  <th>Chosen Word</th>
                </tr>
              </thead>
              <tbody>
                {lastRound.map((r, i) => { 
                  return (
                    <tr key={i}>
                      <td key={i}>
                        {lastRound[i].username}
                      </td>
                      <td key={i}>
                        {globals[lastRound[i].username]}
                      </td>
                      <td key={i}>
                        {scores[lastRound[i].username]}
                      </td>
                      <td key={i}>
                        {lastRound[i].selectedWord}
                      </td>
                    </tr>
                  )}
                )}
              </tbody>
            </table>
          </div>
          <div>
            {currPlayer.creator ? (
              <button type="button" onClick={onStart}>
                Next
              </button>
            ) : (
              <div>Please wait... Creator is starting the next round</div>
            )}
          </div>
        </div>
      </div>
    );
  };

export default Results;