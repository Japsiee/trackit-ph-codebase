import { createContext, useState } from 'react';

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ elem }) => {
  const [population, setPopulation] = useState({
    male: 0,
    female: 0,
    pwd: 0,
    fourps: 0,
    senior: 0,
    pets: 0
  })

  return(
    <GeneralContext.Provider value={{ population, setPopulation }}>
      { elem }
    </GeneralContext.Provider>
  )
}