import React, { FC } from 'react';
import '../sass/styles.scss';
import AddBoardForm from './AddBoardForm';
import DepthBar from './DepthBar';
import { Boardtype } from './Interfaces';

type depthBarProps = {
  prevBoardList: Boardtype[];
  setActiveBoard: Function;
  setPrevBoardList: Function;
  editing: boolean;
  board: Boardtype;
  setEditing: Function;
  setBoard: Function;
};

const DepthBarCont: FC<depthBarProps> = ({
  prevBoardList,
  setPrevBoardList,
  setActiveBoard,
  editing,
  board,
  setEditing,
  setBoard,
}) => {
  return (
    <div className='depthBarCont'>
      <div className='depthBar'>
        {editing ? (
          <AddBoardForm
            parent={board.id}
            placeholder={'Change List Name'}
            edit={true}
            initValue={board.name}
            setEditing={setEditing}
            boardID={board.id}
            index={board.listItems.length}
            setBoard={setBoard}
            board={board}
          />
        ) : (
          <>
            <div className='depthBarSpacer' />
            <span
              className='boardName clickable'
              onClick={() => setEditing(board.id)}
            >
              {board.name}
            </span>
          </>
        )}
        <DepthBar
          prevBoardList={prevBoardList}
          setActiveBoard={setActiveBoard}
          setPrevBoardList={setPrevBoardList}
        />
      </div>
    </div>
  );
};

export default DepthBarCont;
