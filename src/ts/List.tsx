import React, { FC } from 'react';
import axios from 'axios';

import ListItem from './ListItem';
import '../sass/styles.scss';

type ListProps = {
  setBoard: Function;
  list: {
    uid: string;
    'Board.name': string;
    'Board.owner'?: {
      uid: string;
      'User.name': string;
    };
    'Board.listItems'?: {
      uid: string;
      'Board.name': string;
      'Board.owner'?: {
        uid: string;
        'User.name': string;
      };
      'Board.listItems'?: {
        uid: string;
        'Board.name': string;
        'Board.owner'?: {
          uid: string;
          'User.name': string;
        };
      }[];
    }[];
  };
};

const List: FC<ListProps> = ({ list, setBoard }) => {
  const getBoard = (/*e: object*/): void => {
    axios.get('/board').then(({ data }) => {
      setBoard(data);
    });
  };

  return (
    <div className='list' onClick={getBoard}>
      {list['Board.name']}
      {list['Board.listItems'] &&
        list['Board.listItems'].map((item) => {
          return (
            <ListItem
              key={item['Board.name']}
              item={item}
              getBoard={getBoard}
            />
          );
        })}
    </div>
  );
};

export default List;
