import React, { FC } from 'react';
import ListItem from './ListItem';
import '../sass/styles.scss';

type ListProps = {
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

const List: FC<ListProps> = ({ list }) => {
  return (
    <div className='list'>
      {list['Board.name']}
      {list['Board.listItems'] &&
        list['Board.listItems'].map((item) => {
          return <ListItem key={item['Board.name']} item={item} />;
        })}
    </div>
  );
};

export default List;
