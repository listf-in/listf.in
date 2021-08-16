import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import React, { FC } from 'react';
import '../sass/styles.scss';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { Boardtype } from './Interfaces';

type ListItemProps = {
  getBoard: Function;
  client: ApolloClient<NormalizedCacheObject>;
  refreshTopBoard: Function;
  addMiddleBoard: Function;
  item: Boardtype;
  setEditing: Function;
};
const ListItem: FC<ListItemProps> = ({
  item,
  getBoard,
  client,
  refreshTopBoard,
  addMiddleBoard,
  setEditing,
}) => {
  return (
    <div
      className='listItem clickable'
      onClick={(e) => {
        addMiddleBoard();
        getBoard(e, item.id);
      }}
    >
      <p className='listItemName'>{item['name']}</p>
      <EditButton client={client} boardID={item.id} callback={setEditing} />
      <DeleteButton
        boardID={item.id}
        client={client}
        callback={refreshTopBoard}
      />
    </div>
  );
};

export default ListItem;
