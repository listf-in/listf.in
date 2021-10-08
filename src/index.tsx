import React from 'react';
import ReactDOM from 'react-dom';
import App from './ts/App';
import { Auth0Provider } from '@auth0/auth0-react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: '/',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3080/graphql',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Auth0Provider
    domain='dev-v191p81s.us.auth0.com'
    clientId='QBalhUxGPNfswO2xamB6QHoDx3QXdRFa'
    redirectUri={window.location.origin}
  >
    <ApolloProvider client={client}>
      <App client={client} />
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
