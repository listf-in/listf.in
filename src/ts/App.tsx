import React, { FC, useState, useEffect } from 'react';
import '../sass/styles.scss';
import socketIOClient from 'socket.io-client';
// const ENDPOINT = '';

const App:FC = () => {
  const [connection, setConnection] = useState({});
  const [response, setResponse] = useState(''); //socket setup only //not important

  useEffect(() => {
    console.log('connecting')
    // const socket = socketIOClient(ENDPOINT);
    const socket = socketIOClient();
    setConnection(socket);
    socket.on('HelloClient', data => {
      setResponse(data);
    });
  }, []);
  return (
    <div>
      <div>socket info:
        <br />
        socket ID: {connection.id}
        <br/>
        connection time: {response}
      </div>

      <div>placeholder text</div>
    </div>
  )
}

export default App;
