import React, { FC, useState, useEffect } from 'react';
import '../sass/styles.scss';
import { io, Socket } from 'socket.io-client';
import { Method } from 'axios';
// const ENDPOINT = ''; //if we use a specific endpoint

const App:FC = () => {
  const [connection, setConnection] = useState<null | Socket>(null);
  // const [connection, setConnection] = useState(null as null | Socket); //alternative typing

  const [connectionTime, setConnectionTime] = useState(''); //example

  useEffect(() => {
    console.log('connecting');
    // const socket = socketIOClient(ENDPOINT); //if you set an endpoint
    const socket = io();

    setConnection(socket);

    socket.on('HelloClient', (data: string) => {
      setConnectionTime(data);
    });
  }, []);

  return (
    <div>
      <div>socket info:
        <br />
        socket ID: {connection ? connection.id : null}
        <br/>
        connection time: {connectionTime}
      </div>

      <div>placeholder text</div>
    </div>
  )
}

export default App;
