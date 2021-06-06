import React, { FC, useState, useEffect } from 'react';
import '../sass/styles.scss';

type ListItemProps = {
  item: {};
};
const ListItem: FC<ListItemProps> = ({ item }) => {
  return <div className='listItem'>{item['Board.name']}</div>;
};

export default ListItem;
