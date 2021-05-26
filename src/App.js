import React from "react";

import Pages from "./pages";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache, from
} from "@apollo/client";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import { changueTokenReducer } from "./reducers/changueToken";

import { BACKEND_GQL_API_URI } from './constantVariables';

import { setContext } from "apollo-link-context";

import thunk from "redux-thunk";

const uri = BACKEND_GQL_API_URI;

const httpLink = createHttpLink({ uri, credentials: "include" });
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true,
});

function App(preloadedState) {

  let rootReducer = combineReducers({
    tokenState: changueTokenReducer,
  });

  const store = createStore(
    rootReducer,
    preloadedState.preloadedState,
    applyMiddleware(thunk)
  );

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Pages />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
