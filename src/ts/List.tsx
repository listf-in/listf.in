import React, { FC } from 'react';
// import axios from 'axios';

import ListItem from './ListItem';
import '../sass/styles.scss';

type ListProps = {
  setBoard: Function;
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

const List: FC<ListProps> = ({ list, setBoard }) => {
  const getBoard = (/*e: object*/): void => {
    // axios.get('/board').then(({ data }) => {
    //   setBoard(data);
    // });
    //replace with updated version for apollo
  };

  return (
    <div className='list' onClick={getBoard}>
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
