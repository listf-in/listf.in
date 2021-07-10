/* eslint-disable no-undef */
const path = require('path');
const express = require('express');

const port = process.env.PORT || 3080;
const app = express();

const http = require('http').Server(app);

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../build')));

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
