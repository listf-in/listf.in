import React, { FC, MouseEventHandler } from 'react';
import '../sass/styles.scss';

type ListItemProps = {
  getBoard: MouseEventHandler;
  item: {
    id: string;
    name: string;
    owner?: {
      id: string;
      name: string;
    };
    listItems?: {}[];
  };
};
const ListItem: FC<ListItemProps> = ({ item, getBoard }) => {
  return (
    <div className='listItem' onClick={getBoard}>
      {item['name']}
    </div>
  );
};

export default ListItem;
