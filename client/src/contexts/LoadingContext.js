import { useState, createContext } from 'react';

export const LoadingContext = createContext(null);

export const LoadingContextProvider = ({ elem }) => {
  const [loading, setLoading] = useState(true);

  return(
    <LoadingContext.Provider value={{ loading, setLoading }}>
      { elem }
    </LoadingContext.Provider>
  )
}