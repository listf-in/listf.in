import * as path from 'path';
import * as express from 'express';
const port = 3080;
const app = express();
import * as http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);


app.use('/', express.static(path.join(__dirname, '../build')));

io.on('connection', (socket) => {
  console.log('a user has connected');

  socket.on('disconnect', () => {
    console.log('a user has disconnected');
  });
});

server.listen(port, ()=> {
  console.log(`listening on port ${port}`);
});

