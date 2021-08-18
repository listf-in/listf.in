import React, { FC, MouseEventHandler } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

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
  goBack: MouseEventHandler<HTMLButtonElement>;
  setPrevBoardList: Function;
  board: Boardtype;
  editing: string;
  setEditing: Function;
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
  editing,
  setEditing,
}) => {
  const addToTopBoard = (
    e: React.FormEvent<HTMLFormElement>,
    value: string
  ) => {
    if (value === board.id) {
      window.alert('You cannot add a board to itself!');
    } else {
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
    }
  };

  const onDragEnd = (context, something) => {
    //delete from prev location
    //add to new location
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
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
              callback={(e, result) =>
                setBoard(result.data.updateBoard.board[0])
              }
            />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
