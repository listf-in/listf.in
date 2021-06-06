import React, { FC, useState, useEffect } from 'react';
import '../sass/styles.scss';

type ListItemProps = {
  item: {
    uid: String;
    'Board.name': String;
    'Board.owner'?: {
      uid: String;
      'User.name': String;
    };
    'Board.listItems'?: {}[];
  };
};
const ListItem: FC<ListItemProps> = ({ item }) => {
  return <div className='listItem'>{item['Board.name']}</div>;
};

export default ListItem;
