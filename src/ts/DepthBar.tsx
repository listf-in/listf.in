import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import React, { FC } from 'react';
import '../sass/styles.scss';

type depthBarProps = {
  depthList: Array<string>;
};

const DepthBar: FC<depthBarProps> = ({ depthList }) => {
  const depthBarItems = depthList.map((depth) => {
    return { depth };
  });
  return { depthBarItems };
};

export default DepthBar;
