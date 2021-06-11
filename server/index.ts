import * as path from 'path';
import * as express from 'express';
import { Socket } from 'socket.io';
const boardData = require('../dummy_board_data.json');

const port = 3080;
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/board', (req, res) => {
  res.send(boardData);
});

io.on('connection', (socket: Socket) => {
  console.log('a user has connected, socket.id: ', socket.id);
  socket.emit('HelloClient', new Date().toLocaleString());

  socket.on('disconnect', () => {
    console.log('a user has disconnected, socket.id: ', socket.id);
  });

  //listening events

  socket.on('insertEventNameHere', () => {
    //template sorta
    //do stuff
    const variable: string = 'whatever variable stuff you want';
    socket.emit('insertClientListeningEventNameHere', variable);
  });
});

/*const server = */ http.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// httpServer.listen(port, ()=> {
//   console.log(`listening on port ${port}`);
// });
