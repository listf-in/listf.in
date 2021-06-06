import React, { FC, useState, useEffect } from 'react';
import '../sass/styles.scss';

type ListProps = {
  list: {};
};
const List: FC<ListProps> = ({ list }) => {
  return <div className='list'>{list['Board.name']}</div>;
};

export default List;
