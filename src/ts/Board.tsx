import React, { FC } from 'react';

import '../sass/styles.scss';
import List from './List';
import AddBoardForm from './AddBoardForm';
import DepthBar from './DepthBar';

type BoardProps = {
  boardFetch: Function;
  client: any;
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
  return (
    <div className='board'>
      <DepthBar
        prevBoardList={prevBoardList}
        boardFetch={boardFetch}
        setPrevBoardList={setPrevBoardList}
      />
      {board.name}
      <button
        className={'backButton'}
        onClick={goBack}
        disabled={!prevBoardList[0]}
      >
        Back
      </button>
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
