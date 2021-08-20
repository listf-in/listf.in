import React, { FC, useState, useEffect } from 'react';
import '../sass/styles.scss';
import {
  ApolloClient,
  // InMemoryCache,
  // ApolloProvider,
  // useQuery,
  gql,
  NormalizedCacheObject,
} from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import Board from './Board';

type AppProps = {
  client: ApolloClient<NormalizedCacheObject>;
};

const App: FC<AppProps> = ({ client }) => {
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

  const [prevBoardList, setPrevBoardList] = useState([]);

  const [editing, setEditing] = React.useState('');

  const goBack = (e) => {
    e.preventDefault();
    const bBoard = prevBoardList[prevBoardList.length - 1];
    setPrevBoardList(prevBoardList.slice(0, prevBoardList.length - 1));
    boardFetch(bBoard.id);
  };

  const addHistory = (brd?: object) => {
    const newHist = brd ? [board, brd] : [board];
    setPrevBoardList(prevBoardList.concat(newHist));
  };

  const boardFetch = (id: string): void => {
    client.cache.reset();
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
              home
              listItems {
                id
                index
                board {
                  id
                  name
                  owner {
                    email
                    name
                  }
                  listItems {
                    id
                    index
                    board {
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
        setBoard(result.data.getBoard);
        setEditing('');
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
                home
                listItems {
                  id
                  index
                  board {
                    id
                    name
                    owner {
                      email
                      name
                    }
                    listItems {
                      id
                      index
                      board {
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
          }
        `,
      })
      .then((result) => {
        // debugger;
        setBoard(result.data.getUser.homeBoard);
      })
      .catch((err) => {
        // debugger;
        if (err.message === `Cannot read property 'homeBoard' of null`) {
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
                      },
                      home: true
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
                        index
                        board {
                          id
                          name
                          owner {
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
              setBoard(result.data.addUser.user[0].homeBoard);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };

  useEffect(() => {
    if (user) {
      userFetch(user.email);
    }
  }, [user]);

  return (
    <>
      <Login />
      {user && (
        <Board
          client={client}
          board={board}
          setBoard={setBoard}
          boardFetch={boardFetch}
          addHistory={addHistory}
          goBack={goBack}
          prevBoardList={prevBoardList}
          setPrevBoardList={setPrevBoardList}
          editing={editing}
          setEditing={setEditing}
        />
      )}
    </>
  );
};

export default App;
