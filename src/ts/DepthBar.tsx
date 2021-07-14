import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import React, { FC } from 'react';
import '../sass/styles.scss';

type depthBarProps = {
  prevBoardList: Array<object>;
  boardFetch: Function;
  setPrevBoardList: Function;
};

const DepthBar: FC<depthBarProps> = ({
  prevBoardList,
  setPrevBoardList,
  boardFetch,
}) => {
  const depthBarItems = prevBoardList.map((depth) => {
    return (
      <span
        key={depth.name}
        onClick={() => {
          boardFetch(depth.id);
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
