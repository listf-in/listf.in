import React, { FC, useState, useEffect } from 'react';
import ListItem from './ListItem';
import '../sass/styles.scss';

type ListProps = {
  list: {};
};
const List: FC<ListProps> = ({ list }) => {
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
