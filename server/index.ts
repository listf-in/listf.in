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
  socket.emit('HelloClient', getCurrentTime());
  console.log(socket.id);

  socket.on('disconnect', () => {
    console.log('a user has disconnected');
  });

  //listening events

  //template sorta
  socket.on('insertEventNameHere', () => {
    //do stuff
    let variable = 'whatever variable stuff you want';
    socket.emit('insertClientListeningEventNameHere', variable);
  });
});

const getCurrentTime = () => {
  const currentDate = new Date();
  const dateTime = currentDate.getDate() + '/' + (currentDate.getMonth() +1) + '/' + currentDate.getFullYear() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
  console.log(dateTime)
  return dateTime;
};

server.listen(port, ()=> {
  console.log(`listening on port ${port}`);
});

