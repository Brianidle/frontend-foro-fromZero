import React from "react";

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

import { getBrowserCookiesInJSON } from "./helpers/cookieHelper";

const uri = "http://localhost:4000/foroApi";
const httpLink = createHttpLink({ uri, credentials: "include" });
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
      authorization: getBrowserCookiesInJSON().user_session || "",
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
  //When the webpage opens, cookies are read to see if the webpage have a token, and updates the redux state
  //so the components who depends on the state have an initial value

  let token = getBrowserCookiesInJSON().user_session;
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
