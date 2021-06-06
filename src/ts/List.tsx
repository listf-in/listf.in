import React, { FC, useState, useEffect } from 'react';
import ListItem from './ListItem';
import '../sass/styles.scss';

type ListProps = {
  list: {
    uid: String;
    'Board.name': String;
    'Board.owner'?: {
      uid: String;
      'User.name': String;
    };
    'Board.listItems'?: {
      uid: String;
      'Board.name': String;
      'Board.owner'?: {
        uid: String;
        'User.name': String;
      };
      'Board.listItems'?: {
        uid: String;
        'Board.name': String;
        'Board.owner'?: {
          uid: String;
          'User.name': String;
        };
      }[];
    }[];
  };
};
const List: FC<ListProps> = ({ list }) => {
  debugger;
  return (
    <div className='list'>
      {list['Board.name']}
      {list['Board.listItems'] &&
        list['Board.listItems'].map((item) => {
          return <ListItem item={item} />;
        })}
    </div>
  );
};

export default List;
