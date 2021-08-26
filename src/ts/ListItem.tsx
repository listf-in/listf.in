import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../sass/styles.scss';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { Boardtype, Ordertype } from './Interfaces';

type ListItemProps = {
  setActiveBoard: Function;
  client: ApolloClient<NormalizedCacheObject>;
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
  setActiveBoard,
  client,
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
          onClick={() => {
            addMiddleBoard();
            setActiveBoard(item.id);
          }}
        >
          <p className='listItemName'>{item.name}</p>
          <EditButton boardID={item.id} callback={setEditing} />
          <DeleteButton
            client={client}
            parentID={parentID}
            container={container}
          />
        </div>
      )}
    </Draggable>
  );
};

export default ListItem;
