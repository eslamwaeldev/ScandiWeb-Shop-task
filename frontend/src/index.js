import React from "react";
import ReactDOM from "react-dom";
import App from "../src/components/App";
import { store } from "../src/redux/store";
import { Provider } from "react-redux";
// import ApolloClient from "apollo-boost";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
