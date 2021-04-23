import React from "react";

import Pages from "./pages";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache, from
} from "@apollo/client";

import { onError } from '@apollo/client/link/error';

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import { changueTokenReducer } from "./reducers/changueToken";
import { doChangueToken } from "./actions/actionCreators";

import { BACKEND_API_URI } from './constantVariables';


const uri = BACKEND_API_URI;

const httpLink = createHttpLink({ uri, credentials: "include" });
const cache = new InMemoryCache();

let rootReducer = combineReducers({
  tokenState: changueTokenReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const sessionAliveLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {

    const context = operation.getContext()

    let responseFromServer = context.response;
    if (responseFromServer.status == 200) {

      if (!store.tokenState) {
        store.dispatch(doChangueToken("Authorized"));
      }
    }

    return response;
  })
})

const logoutLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) console.log("Session Closed");
})

const client = new ApolloClient({
  link: from([logoutLink, sessionAliveLink, httpLink]),
  cache,
  resolvers: {},
  connectToDevTools: true,
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Pages />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
