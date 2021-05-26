import React from 'react';
import ReactDOM from 'react-dom';
import { BACKEND_EXPRESS_API_URI } from './src/constantVariables';

import App from './src/App';

const checkLoggedIn = async () => {
  const response = await fetch(BACKEND_EXPRESS_API_URI + '/session', {
    method: "GET",
    credentials: 'include'
  });
  const { idUser } = await response.json();

  let preloadedState = {};
  if (idUser) {
    preloadedState = {
      tokenState: idUser
    };
  }
  return preloadedState;
};

const renderApp = (preloadedState) => {
  ReactDOM.render(<App preloadedState={preloadedState} />,
    document.getElementById('root')
  );
}

(async () => renderApp(await checkLoggedIn()))();

