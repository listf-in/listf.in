import React, { FC } from 'react';
import '../sass/styles.scss';

type ListItemProps = {
  getBoard: Function;
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
    <div className='listItem' onClick={(e) => getBoard(e, item.id)}>
      {item['name']}
    </div>
  );
};

export default ListItem;
