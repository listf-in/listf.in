import React, { FC } from 'react';
import '../sass/styles.scss';

type ListItemProps = {
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
const ListItem: FC<ListItemProps> = ({ item }) => {
  return <div className='listItem'>{item['Board.name']}</div>;
};

export default ListItem;
