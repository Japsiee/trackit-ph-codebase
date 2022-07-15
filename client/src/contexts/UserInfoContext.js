import { useState, createContext } from 'react';

export const UserInfoContext = createContext(null);

export const UserInfoContextProvider = ({ elem }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false)

  return(
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, loading, setLoading }}>
      { elem }
    </UserInfoContext.Provider>
  )
}