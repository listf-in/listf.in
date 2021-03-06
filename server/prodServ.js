/* eslint-disable no-undef */
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');
const deleteAll = require('./delete');

const app = express();

// Certificate
const privateKey = fs.readFileSync(
  '/etc/letsencrypt/live/listf.in/privkey.pem',
  'utf8'
);
const certificate = fs.readFileSync(
  '/etc/letsencrypt/live/listf.in/cert.pem',
  'utf8'
);
const ca = fs.readFileSync('/etc/letsencrypt/live/listf.in/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../build')));

app.post('/delete', (req, res) => {
  const { id } = req.body;
  deleteAll(id);

  res.send(id + ' deleted');
});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});
