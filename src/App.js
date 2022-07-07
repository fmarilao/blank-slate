import { useContext, useEffect, useRef } from 'react';
import InGame from './components/InGame';
import Principal from './components/Principal'
import FirestoreContext from './context/FirestoreContext';

// Initialize Firebase
function App() {
  const { joinedGameId, gameData } = useContext(FirestoreContext);

  if (joinedGameId && !gameData) {
    return <div>Cargando...</div>;
  }
  
  return (
    <div>
      {gameData ? 
        <InGame /> : 
        <Principal /> 
      }
    </div>
  );
}

export default App;
