/* eslint-disable no-undef */
// const path = require('path');
// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');

// async function startApolloServer(typeDefs, resolvers) {
//   const server = new ApolloServer({ typeDefs, resolvers });
//   await server.start();
//   const app = express();
//   server.applyMiddleware({ app });
//   app.use(express.json());
//   app.use('/', express.static(path.join(__dirname, '../build')));
//   await new Promise((resolve) => app.listen({ port: 3080 }, resolve));
//   console.log(`🚀 Server ready at http://localhost:3080${server.graphqlPath}`);
// }
// startApolloServer(require('../schemagql.graphql'));

// const port = process.env.PORT || 3080;
// const app = express();

// const http = require('http').Server(app);

// http.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { myGraphQLSchema } = require('../schemagql.graphql');

const PORT = 3080;
const app = express();

app.use('/graphql', express.json());

const apolloServer = new ApolloServer({ schema: myGraphQLSchema });
apolloServer.applyMiddleware({ app });

const pubsub = new PubSub();
const server = createServer(app);

server.listen(PORT, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: myGraphQLSchema,
    },
    {
      server: server,
      path: '/subscriptions',
    }
  );
});
