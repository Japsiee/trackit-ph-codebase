import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './contexts/UserContext';
import { UserInfoContextProvider } from './contexts/UserInfoContext';
import { GeneralContextProvider } from './contexts/GeneralContext';

ReactDOM.render(
  <GeneralContextProvider 
    elem={
      <UserInfoContextProvider 
        elem={
          <UserContextProvider elem={<App />} />
        } 
      />
    }
  />
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
