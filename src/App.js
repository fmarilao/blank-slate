import { useContext, useEffect, useRef } from 'react';
import Principal from './components/Principal'
import FirestoreContext from './context/FirestoreContext';

// Initialize Firebase
function App() {
  const { joinedGameId } = useContext(FirestoreContext);
  /* const subscription = useRef();
  const subscribeToFirestore = async () => {
    if (subscription.current) return;
    const gamesDb = db.collection("games");
    subscription.current = gamesDb.doc("D7DGcWqHk173BDCOdmnD").onSnapshot((doc) => {
      console.log(doc.data());
    });
  }

  useEffect(() => {
    subscribeToFirestore();
  }, []); */

  return (
    <div>
      {joinedGameId ? <div>Game Id: {joinedGameId}</div> : 
      <Principal /> }
    </div>
  );
}

export default App;
