import React, { FC, useState, useEffect } from 'react';
import '../sass/styles.scss';
// import { io, Socket } from 'socket.io-client';
import List from './List';
import Login from './Login';
import {
  ApolloClient,
  // InMemoryCache,
  // ApolloProvider,
  // useQuery,
  gql,
  NormalizedCacheObject,
} from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
// const ENDPOINT = ''; //if we use a specific endpoint

type AppProps = {
  client: ApolloClient<NormalizedCacheObject>;
};

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

const App: FC<AppProps> = ({ client }) => {
  // const [connection, setConnection] = useState<null | Socket>(null);
  // const [connection, setConnection] = useState(null as null | Socket); //alternative typing

  // const [connectionTime, setConnectionTime] = useState(''); //example

  const { user, isAuthenticated } = useAuth0();

  const [board, setBoard] = useState({
    id: '',
    owner: { id: '', name: '' },
    name: '',
    members: [
      {
        id: '',
        name: '',
      },
    ],
    listItems: [],
  });

  const boardFetch = (id: string = '0x6a'): void => {
    client
      .query({
        query: gql`
          query {
            getBoard(id: "${id}") {
              name
              owner {
                email
                name
              }
              listItems {
                id
                name
                owner {
                  email
                  name
                }
                listItems {
                  id
                  name
                  owner {
                    email
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

  const userFetch = (email: string): void => {
    client
      .query({
        query: gql`
          query {
            getUser(email: "${email}") {
              name
              email
              avatar
              boards {
                id
                name
                owner {
                  email
                  name
                }
              }
              homeBoard {
                id
                name
                owner {
                  email
                  name
                }
                listItems {
                  id
                  name
                  owner {
                    email
                    name
                  }
                  listItems {
                    id
                    name
                    owner {
                      email
                      name
                    }
                    listItems {
                      id
                      name
                      owner {
                        email
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .then((result) => {
        debugger;
        setBoard(result.data.getUser.homeBoard);
      })
      .catch((err) => {
        debugger;
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
    // boardFetch();
  }, []);

  useEffect(() => {
    if (user) {
      userFetch(user.email);
    }
  }, [user]);

  return (
    <div>
      <Login />
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
