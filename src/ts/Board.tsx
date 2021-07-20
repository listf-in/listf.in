import React, { FC } from 'react';

import '../sass/styles.scss';
import List from './List';
import AddBoardForm from './AddBoardForm';
import DepthBar from './DepthBar';
import ShareButton from './ShareButton';
import AddShareButton from './AddShareButton';
import { gql } from '@apollo/client';
import HorizontalScroll from 'react-scroll-horizontal';

type BoardProps = {
  boardFetch: Function;
  client: object;
  setBoard: Function;
  addHistory: Function;
  prevBoardList: Array<object>;
  goBack: Function;
  setPrevBoardList: Function;
  board: {
    id: string;
    name: string;
    owner?: {
      id: string;
      name: string;
    };
    listItems?: {
      id: string;
      name: string;
      owner?: {
        id: string;
        name: string;
      };
      listItems?: {
        id: string;
        name: string;
        owner?: {
          id: string;
          name: string;
        };
      }[];
    }[];
  };
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
      {board.name}
      <button
        className={'backButton clickable'}
        onClick={goBack}
        disabled={!prevBoardList[0]}
      >
        Back
      </button>
      <ShareButton id={board.id} />
      <AddShareButton addToTopBoard={addToTopBoard} />
      <div id='mainBoard'>
        {board.listItems.map((list) => {
          return (
            <List
              key={list.name}
              list={list}
              boardFetch={boardFetch}
              client={client}
              parent={board.id}
              addHistory={addHistory}
            />
          );
        })}
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