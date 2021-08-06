/* eslint-disable no-undef */
const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const port = process.env.PORT || 3080;
const app = express();

app.use('/', express.static(path.join(__dirname, '../build')));

const http = require('http').Server(app);

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
