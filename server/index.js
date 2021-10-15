/* eslint-disable no-undef */
const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = require('./schemagql.graphql');
const resolvers = require('./resolvers');
const apollo = require('./apollo');
const deleteAll = require('./delete');

const port = process.env.PORT || 3080;

(async function () {
  const app = express();

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  server.applyMiddleware({ app });

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: '/subscriptions' }
  );

  app.use(express.json());
  app.use('/', express.static(path.join(__dirname, '../build')));
  app.use(apollo);

  app.post('/delete', (req, res) => {
    const { id } = req.body;
    deleteAll(id);

    res.send(id + ' deleted');
  });

  httpServer.listen(port, () =>
    console.log(`Server is now running on http://localhost:${port}/graphql`)
  );
})();
