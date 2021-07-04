import React, { FC, useState, useEffect } from 'react';
import '../sass/styles.scss';
import { io, Socket } from 'socket.io-client';
import List from './List';
import LoginButton from './LoginButton';
import ProfileInfo from './ProfileInfo';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
// const ENDPOINT = ''; //if we use a specific endpoint

const client = new ApolloClient({
  uri: 'http://144.126.217.146:8080/graphql',
  cache: new InMemoryCache(),
});

type board = {
  id: string;
  owner: user;
  name: string;
  members: [user];
  listItems: [board];
};

type user = {
  id: string;
  name: string;
};

const App: FC = () => {
  // const [connection, setConnection] = useState<null | Socket>(null);
  // const [connection, setConnection] = useState(null as null | Socket); //alternative typing

  // const [connectionTime, setConnectionTime] = useState(''); //example

  const [board, setBoard] = useState({
    id: 'String',
    owner: { id: 'fill', name: 'user' },
    name: 'String',
    members: [
      {
        id: 'String',
        name: 'String',
      },
    ],
    listItems: [
      {
        id: 'String',
        name: 'String',
        owner: { id: 'fill', name: 'user' },
        listItems: [
          {
            id: 'String',
            name: 'String',
            owner: { id: 'fill', name: 'user' },
            listItems: [
              {
                id: 'String',
                name: 'String',
                owner: { id: 'fill', name: 'user' },
                listItems: [{}],
              },
            ],
          },
        ],
      },
    ],
  });

  const boardFetch = (id: string = '0x5'): void => {
    client
      .query({
        query: gql`
          query {
            getBoard(id: "${id}") {
              name
              owner {
                id
                name
              }
              listItems {
                id
                name
                owner {
                  id
                  name
                }
                listItems {
                  id
                  name
                  owner {
                    id
                    name
                  }
                }
              }
            }
          }
        `,
      })
      .then((result) => {
        setBoard(result.data.getBoard);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // console.log('connecting');
    // const socket = socketIOClient(ENDPOINT); //if you set an endpoint
    // const socket = io();
    // setConnection(socket);
    // socket.on('HelloClient', (data: string) => {
    //   setConnectionTime(data);
    // });
    boardFetch();
  }, []);

  return (
    <div>
      <div id='loginButton'>
        <LoginButton />
      </div>
      <div id='userProfileInfo'>
        <ProfileInfo />
      </div>
      {/* <div>
        socket info:
        <br />
        socket ID: {connection && connection.id}
        <br />
        connection time: {connectionTime}
      </div> */}

      {board.name}
      <div id='mainBoard'>
        {board['listItems'].map((list) => {
          return <List key={list.name} list={list} boardFetch={boardFetch} />;
        })}
      </div>
    </div>
  );
};

export default App;
