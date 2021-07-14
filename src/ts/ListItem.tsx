import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import React, { FC } from 'react';
import '../sass/styles.scss';
import DeleteButton from './DeleteButton';

type ListItemProps = {
  getBoard: Function;
  client: ApolloClient<NormalizedCacheObject>;
  refreshTopBoard: Function;
  addMiddleBoard: Function;
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
const ListItem: FC<ListItemProps> = ({
  item,
  getBoard,
  client,
  refreshTopBoard,
  addMiddleBoard,
}) => {
  return (
    <div
      className='listItem clickable'
      onClick={(e) => {
        addMiddleBoard();
        getBoard(e, item.id);
      }}
    >
      {item['name']}
      <DeleteButton
        boardID={item.id}
        client={client}
        callback={refreshTopBoard}
      />
    </div>
  );
};

export default ListItem;
