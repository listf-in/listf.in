import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../sass/styles.scss';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { Boardtype, Ordertype } from './Interfaces';

type ListItemProps = {
  setActiveBoard: Function;
  addMiddleBoard: Function;
  item: Boardtype;
  list: Boardtype;
  container: Ordertype;
  parentID: string;
  setEditing: Function;
  index: number;
  setBoard: Function;
  board: Boardtype;
};
const ListItem: FC<ListItemProps> = ({
  item,
  container,
  parentID,
  setActiveBoard,
  addMiddleBoard,
  setEditing,
  index,
  setBoard,
  board,
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
            parentID={parentID}
            container={container}
            setBoard={setBoard}
            board={board}
          />
        </div>
      )}
    </Draggable>
  );
};

export default ListItem;
