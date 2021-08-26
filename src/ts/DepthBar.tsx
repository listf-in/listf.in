import React, { FC } from 'react';
import '../sass/styles.scss';

type depthBarProps = {
  prevBoardList: Array<object>;
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
            prevBoardList.slice(0, prevBoardList.indexOf(depth))
          );
        }}
      >
        {depth.name + ' > '}
      </span>
    );
  });
  return depthBarItems;
};

export default DepthBar;
