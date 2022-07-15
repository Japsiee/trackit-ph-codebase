import { createContext, useReducer } from "react";

export const UserContext = createContext(null);

const UNVERIFIED_EMAIL = 'UNVERIFIED_EMAIL';
const VERIFIED_EMAIL = 'VERIFIED_EMAIL';
const LOGOUT = 'LOGOUT';

const userInitialState = null;

const userReducer = (state, action) => {
  switch (action.type) {
    case VERIFIED_EMAIL:
      return { 
        ...action.payload,
        data: {
          email: action.payload.email,
          role: action.payload.role
        }
      }
    case UNVERIFIED_EMAIL:
      return {
        data: { 
          email: action.payload.email,
          role: action.payload.role
        }
      };
    case LOGOUT:
      return {
        data: { role: null }
      };
    default:
      return state;
  }
}

export const UserContextProvider = ({ elem }) => {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);

  return(
    <UserContext.Provider value={{ userState, userDispatch }}>
      { elem }
    </UserContext.Provider>
  )
}