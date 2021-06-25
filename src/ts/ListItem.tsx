import React, { FC, MouseEventHandler } from 'react';
import '../sass/styles.scss';

type ListItemProps = {
  getBoard: MouseEventHandler;
  item: {
    uid: string;
    'Board.name': string;
    'Board.owner'?: {
      uid: string;
      'User.name': string;
    };
    'Board.listItems'?: {}[];
  };
};
const ListItem: FC<ListItemProps> = ({ item, getBoard }) => {
  return (
    <div className='listItem' onClick={getBoard}>
      {item['Board.name']}
    </div>
  );
};

export default ListItem;
