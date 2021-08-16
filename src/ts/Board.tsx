import React, { FC } from 'react';

import '../sass/styles.scss';
import List from './List';
import AddBoardForm from './AddBoardForm';
import DepthBar from './DepthBar';
import ShareButton from './ShareButton';
import AddShareButton from './AddShareButton';
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { Boardtype } from './Interfaces';
import EditButton from './EditButton';

type BoardProps = {
  boardFetch: Function;
  client: ApolloClient<NormalizedCacheObject>;
  setBoard: Function;
  addHistory: Function;
  prevBoardList: Array<object>;
  goBack: Function;
  setPrevBoardList: Function;
  board: Boardtype;
};

const Board: FC<BoardProps> = ({
  board,
  boardFetch,
  client,
  setBoard,
  addHistory,
  prevBoardList,
  goBack,
  setPrevBoardList,
}) => {
  const [editing, setEditing] = React.useState('');

  const addToTopBoard = (
    e: React.FormEvent<HTMLFormElement>,
    value: string
  ) => {
    client
      .mutate({
        mutation: gql`mutation {
                updateBoard(input:
                  { filter: {
                    id: "${board.id}"
                  },
                  set: {
                    listItems: [
                      {
                        id: "${value}"
                        home: false
                      }
                    ]
                  }
                }) {
                  board {
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
        setBoard(result.data.updateBoard.board[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='board'>
      <DepthBar
        prevBoardList={prevBoardList}
        boardFetch={boardFetch}
        setPrevBoardList={setPrevBoardList}
      />
      {editing === board.id ? (
        <AddBoardForm
          parent={board.id}
          placeholder={'Change List Name'}
          client={client}
          callback={() => {
            boardFetch(board.id);
          }}
          edit={true}
          initValue={board.name}
          setEditing={setEditing}
          boardID={board.id}
        />
      ) : (
        board.name
      )}
      <button
        className={'backButton clickable'}
        onClick={goBack}
        disabled={!prevBoardList[0]}
      >
        Back
      </button>
      <EditButton boardID={board.id} callback={setEditing} />
      {board.home ? null : <ShareButton id={board.id} />}
      <AddShareButton addToTopBoard={addToTopBoard} />
      <div id='mainBoard'>
        {board.listItems.map((list) =>
          list.id === editing ? (
            <div className='list addBoardForm'>
              <AddBoardForm
                parent={board.id}
                placeholder={'Change List Name'}
                client={client}
                callback={() => {
                  boardFetch(board.id);
                }}
                edit={true}
                initValue={list.name}
                setEditing={setEditing}
                boardID={list.id}
              />
            </div>
          ) : (
            <List
              key={list.name}
              list={list}
              boardFetch={boardFetch}
              client={client}
              parent={board.id}
              addHistory={addHistory}
              editing={editing}
              setEditing={setEditing}
            />
          )
        )}
        <div className='list addBoardForm'>
          <AddBoardForm
            parent={board.id}
            placeholder={'Add List'}
            client={client}
            callback={(e, result) => setBoard(result.data.updateBoard.board[0])}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
