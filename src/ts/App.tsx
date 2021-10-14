import React, { FC, useState, useEffect } from 'react';
import '../sass/styles.scss';
import {
  ApolloClient,
  gql,
  NormalizedCacheObject,
  useSubscription,
} from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import Board from './Board';
import orderBoard from './sharedMethods';
import Landing from './Landing';

type AppProps = {
  client: ApolloClient<NormalizedCacheObject>;
};

const App: FC<AppProps> = ({ client }) => {
  const { user } = useAuth0();
  const [activeBoard, setActiveBoard] = useState('');

  const [board, setBoard] = useState({
    id: '',
    owner: { id: '', name: '' },
    name: '',
    home: true,
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
    setActiveBoard(bBoard.id);
  };

  const addHistory = (brd?: object) => {
    const newHist = brd ? [board, brd] : [board];
    setPrevBoardList(prevBoardList.concat(newHist));
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
              homeBoard {
                id


              }
            }
          }
        `,
      })
      .then((result) => {
        setActiveBoard(result.data.getUser.homeBoard.id);
      })
      .catch((err) => {
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
                    }
                  }
                }
              }
              `,
            })
            .then((result) => {
              setActiveBoard(result.data.addUser.user[0].homeBoard.id);
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

  const boardSub = gql`
    subscription {
      getBoard(id: "${activeBoard}") {
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
            parents
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
                parents
              }
            }
          }
        }
      }
    }
  `;

  const { data, loading } = useSubscription(boardSub, {});
  useEffect(() => {
    if (!loading && data) {
      setBoard(orderBoard(data.getBoard));
    }
  }, [data]);
  console.log(data);

  return user ? (
    <>
      <Login />
      <Board
        client={client}
        board={board}
        setBoard={setBoard}
        setActiveBoard={setActiveBoard}
        addHistory={addHistory}
        goBack={goBack}
        prevBoardList={prevBoardList}
        setPrevBoardList={setPrevBoardList}
        editing={editing}
        setEditing={setEditing}
      />
    </>
  ) : (
    <Landing />
  );
};

export default App;
