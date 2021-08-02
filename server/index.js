/* eslint-disable no-undef */
const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  const app = express();
  server.applyMiddleware({ app });
  app.use(express.json());
  app.use('/', express.static(path.join(__dirname, '../build')));
  await new Promise((resolve) => app.listen({ port: 3080 }, resolve));
  console.log(`🚀 Server ready at http://localhost:3080${server.graphqlPath}`);
}
startApolloServer(require('../schemagql.graphql'));

// const port = process.env.PORT || 3080;
// const app = express();

// const http = require('http').Server(app);

// http.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });
