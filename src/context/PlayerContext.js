import { createContext, useState } from 'react';

const PlayerContext = createContext({ username: null });

// High Order Component (HOC)
export const PlayerContextProvider = ({ children }) => {
    const [username, setUsername] = useState();
    const [selectedWord, setSelectedWord] = useState();

    return (
      <PlayerContext.Provider value={{ username, setUsername, selectedWord, setSelectedWord }}>
        {children}
      </PlayerContext.Provider>
    );
};

export default PlayerContext;