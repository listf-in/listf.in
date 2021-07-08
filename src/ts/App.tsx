import React, { FC, useState, useEffect } from 'react';
import '../sass/styles.scss';
// import { io, Socket } from 'socket.io-client';
import List from './List';
import Login from './Login';
import {
  ApolloClient,
  // InMemoryCache,
  // ApolloProvider,
  useQuery,
  gql,
  NormalizedCacheObject,
} from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import AddBoardForm from './AddBoardForm';
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

  const { user } = useAuth0();

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

  const boardFetch = (id: string): void => {
    client
      .query({
        query: gql`
          query {
            getBoard(id: "${id}") {
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

                  }
                }
              }
            }
          }
        `,
      })
      .then((result) => {
        setBoard(result.data.getUser.homeBoard);
      })
      .catch((err) => {
        if (err === err) {
          //check to see if correct error
          client
            .mutate({
              mutation: gql`mutation {
                addUser(input: [
                  {
                    name: "${user.name}",
                    email: "${user.email}",
                    homeBoard: {
                      name: "${user.name}'s Home Board",
                      owner: {
                        email: "${user.email}"
                      }
                    }
                  }
                ]) {
                  user {
                    name
                    email
                    avatar
                    homeBoard {
                      id
                      name
                      owner	{
                        name
                      }
                      listItems {
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
              setBoard(result.data.addUser.user[0].homeBoard);
            })
            .catch((err) => {
              console.log(err);
            });
        }
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
      {/*this all needs to be added to it's own component*/}
      {board.name}
      <div id='mainBoard'>
        {board['listItems'].map((list) => {
          return (
            <List
              key={list.name}
              list={list}
              boardFetch={boardFetch}
              client={client}
              parent={board.id}
            />
          );
        })}
        <div className='list addBoardForm'>
          <AddBoardForm
            parent={board.id}
            placeholder={'Add List'}
            client={client}
            callback={(result) => setBoard(result.data.updateBoard.board[0])}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
