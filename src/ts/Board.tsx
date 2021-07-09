import React, { FC } from 'react';

import '../sass/styles.scss';
import List from './List';
import AddBoardForm from './AddBoardForm';

type BoardProps = {
  boardFetch: Function;
  client: any;
  setBoard: Function;
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

const Board: FC<BoardProps> = ({ board, boardFetch, client, setBoard }) => {
  return (
    <div className='board'>
      {board.name}
      <div id='mainBoard'>
        {board.listItems.map((list) => {
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
            callback={(e, result) => setBoard(result.data.updateBoard.board[0])}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
