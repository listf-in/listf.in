import React, { FC, useState, useEffect } from 'react';
import '../sass/styles.scss';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import List from './List';
import LoginButton from './LoginButton';
import ProfileInfo from './ProfileInfo';
// const ENDPOINT = ''; //if we use a specific endpoint

type board = {
  uid: String;
  'Board.owner': user;
  'Board.name': string;
  'Board.members': [user];
  'Board.listItems': [board];
};

type user = {
  uid: string;
  'User.name': string;
};

const App: FC = () => {
  const [connection, setConnection] = useState<null | Socket>(null);
  // const [connection, setConnection] = useState(null as null | Socket); //alternative typing

  const [connectionTime, setConnectionTime] = useState(''); //example

  const [board, setBoard] = useState({
    uid: 'String',
    'Board.owner': { uid: 'fill', 'User.name': 'user' },
    'Board.name': 'String',
    'Board.members': [
      {
        uid: 'String',
        'User.name': 'String',
      },
    ],
    'Board.listItems': [
      {
        uid: 'String',
        'Board.name': 'String',
        'Board.owner': { uid: 'fill', 'User.name': 'user' },
        'Board.listItems': [
          {
            uid: 'String',
            'Board.name': 'String',
            'Board.owner': { uid: 'fill', 'User.name': 'user' },
            'Board.listItems': [
              {
                uid: 'String',
                'Board.name': 'String',
                'Board.owner': { uid: 'fill', 'User.name': 'user' },
                'Board.listItems': [{}],
              },
            ],
          },
        ],
      },
    ],
  });

  useEffect(() => {
    console.log('connecting');
    // const socket = socketIOClient(ENDPOINT); //if you set an endpoint
    const socket = io();

    setConnection(socket);

    socket.on('HelloClient', (data: string) => {
      setConnectionTime(data);
    });
    axios
      .get('/board')
      .then((board) => {
        setBoard(board.data);
      })
      .catch((err) => {
        setBoard(err);
      });
  }, []);

  return (
    <div>
      <div id='loginButton'>
        <LoginButton/>
      </div>
      <div id='userProfileInfo'>
        <ProfileInfo />
      </div>
      <div>
        socket info:
        <br />
        socket ID: {connection && connection.id}
        <br />
        connection time: {connectionTime}
      </div>

      {board['Board.name']}
      <div id='mainBoard'>
        {board['Board.listItems'].map((list) => {
          return <List key={list['Board.name']} list={list} />;
        })}
      </div>
    </div>
  );
};

export default App;
