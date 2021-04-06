import React from 'react';

import Pages from "./pages";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "apollo-link-context";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import { changueTokenReducer } from "./reducers/changueToken";
import { doChangueToken } from "./actions/actionCreators";

const uri = "http://localhost:4000/foroApi";
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

let rootReducer = combineReducers({
  tokenState: changueTokenReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true,
});

function App() {
  let token = localStorage.getItem("token");
  if (token) {
    store.dispatch(doChangueToken(token));
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Pages />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
