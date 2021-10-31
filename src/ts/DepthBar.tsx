import React, { FC } from 'react';
import '../sass/styles.scss';
import { Boardtype } from './Interfaces';

type depthBarProps = {
  prevBoardList: Boardtype[];
  setActiveBoard: Function;
  setPrevBoardList: Function;
};

const DepthBar: FC<depthBarProps> = ({
  prevBoardList,
  setPrevBoardList,
  setActiveBoard,
}) => {
  const depthBarItems = prevBoardList.map((depth) => {
    return (
      <span
        className={'clickable depthBarItem'}
        key={depth.id}
        onClick={() => {
          setActiveBoard(depth.id);
          setPrevBoardList(
            prevBoardList.slice(prevBoardList.indexOf(depth) + 1).reverse()
          );
        }}
      >
        {'  < ' + depth.name}
      </span>
    );
  });
  return <>{depthBarItems}</>;
};

export default DepthBar;
