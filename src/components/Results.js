import React, { useContext, useEffect, useState } from 'react'
import PlayerContext from "../context/PlayerContext";
import FirestoreContext from '../context/FirestoreContext';

const Results = ({guessWord, onStart }) => {
const { username } = useContext(PlayerContext)
const { joinedGameId, gameData} = useContext(FirestoreContext)
const { players } = gameData
const currPlayer = players.find((player) => player.username === username);

const currRound = gameData.rounds.length;
const lastRound = gameData[`selectedWords_${currRound}`]
const [globals, setGlobals] = useState({})
const [scores, setScores] = useState({})

const getRoundScores = (round) => {
    const results = {};
    const selected = gameData[`selectedWords_${round}`]
    selected.forEach(({selectedWord})=> {
        if (selectedWord in results) results[selectedWord]++;
        else results[selectedWord] = 1
    })

    // en base a las coincidencias calculamos el score de c/ user
    const scores = {}
    selected.forEach(({selectedWord, username}) => {
        let wordPoints = 0
        if (results[selectedWord] > 2) {
            wordPoints = 1;
        }
        if (results[selectedWord] === 2){
            wordPoints = 3;
        }
        scores[username] = wordPoints
    })
    return scores
}

useEffect(()=> {
    const scores = getRoundScores(currRound)
    setScores(scores)
    const globalScore = getRoundScores(currRound)
    for(let i = 1; i < currRound; i++) {
        const s = getRoundScores(currRound)
        Object.keys(s).forEach((uname) => {
            globalScore[uname] += s[uname]
        })
    }
    setGlobals(globalScore)
}, [])

  return (
    <>
    <div className="Main">
      <h2>Resultados</h2>
      <div>
        <h3>game id:</h3>
        <p>{joinedGameId}</p>
      </div>
      <div>
        <h3>online players:</h3>
        <p>{players.length}</p>
      </div>
      <div>
        la palabra era: {guessWord}
      </div>
    <div>
        <h2>Estado de las respuestas:</h2>
    </div>
        <table>
            <thread>
                <tr>
                    <th>Username</th>
                    <th>Puntos Actuales</th>
                    <th>Puntos Obtenidos</th>
                    <th>Palabra Elegida</th>
                </tr>
            </thread>
            <tbody>
                {lastRound.map((r, i) => {
                    return (
                        <tr key={i}>
                            <td>
                                {lastRound[i].username}
                            </td>
                            <td>
                                {globals[lastRound[i].username]}
                            </td>
                            <td>
                                {scores[lastRound[i].username]}
                            </td>
                            <td>
                                {lastRound[i].selectedWord}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    <div>
        {currPlayer.creator ? (
            <button type='button' onClick={onStart}>
                Siguiente ronda
            </button>
        ) : (
            <p>Esperando al creador para la siguiente ronda</p>
        )}
    </div>
    </>

  )
}

export default Results