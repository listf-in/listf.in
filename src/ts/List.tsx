import React, { FC } from 'react';
// import axios from 'axios';

import ListItem from './ListItem';
import '../sass/styles.scss';

type ListProps = {
  boardFetch: Function;
  list: {
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

const List: FC<ListProps> = ({ list, boardFetch }) => {
  const getBoard = (e: object, id: string): void => {
    boardFetch(id);
  };

  return (
    <div className='list' onClick={(e) => getBoard(e, list.id)}>
      {list['name']}
      {list['listItems'] &&
        list['listItems'].map((item) => {
          return (
            <ListItem key={item['name']} item={item} getBoard={getBoard} />
          );
        })}
    </div>
  );
};

export default List;
