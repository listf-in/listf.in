import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../sass/styles.scss';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { Boardtype, Ordertype } from './Interfaces';

type ListItemProps = {
  getBoard: Function;
  client: ApolloClient<NormalizedCacheObject>;
  refreshTopBoard: Function;
  addMiddleBoard: Function;
  item: Boardtype;
  list: Boardtype;
  container: Ordertype;
  parentID: string;
  setEditing: Function;
  index: number;
};
const ListItem: FC<ListItemProps> = ({
  item,
  container,
  parentID,
  getBoard,
  client,
  refreshTopBoard,
  addMiddleBoard,
  setEditing,
  index,
}) => {
  return (
    <Draggable draggableId={container.id} index={index} className=' clickable'>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className='listItem clickable'
          onClick={(e) => {
            addMiddleBoard();
            getBoard(e, item.id);
          }}
        >
          <p className='listItemName'>{item.name}</p>
          <EditButton boardID={item.id} callback={setEditing} />
          <DeleteButton
            client={client}
            callback={refreshTopBoard}
            parentID={parentID}
            container={container}
          />
        </div>
      )}
    </Draggable>
  );
};

export default ListItem;
