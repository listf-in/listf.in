import React, { FC } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import ListItem from './ListItem';
import '../sass/styles.scss';
import AddBoardForm from './AddBoardForm';
import DeleteButton from './DeleteButton';
import { Boardtype, Ordertype } from './Interfaces';
import EditButton from './EditButton';

type ListProps = {
  setActiveBoard: Function;
  parent: string;
  addHistory: Function;
  list: Boardtype;
  container: Ordertype;
  editing: string;
  setEditing: Function;
  index: number;
  setBoard: Function;
  board: Boardtype;
};

const List: FC<ListProps> = ({
  list,
  container,
  setActiveBoard,
  parent,
  addHistory,
  editing,
  setEditing,
  index,
  setBoard,
  board,
}) => {
  const addMiddleBoard = () => {
    addHistory(list);
  };

  return (
    <Draggable draggableId={container.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className='listDragCont'
        >
          <div className='list'>
            <h5
              onClick={() => {
                addHistory();
                setActiveBoard(list.id);
              }}
              className='listTitle clickable'
            >
              {list.name}
            </h5>
            <DeleteButton
              parentID={parent}
              container={container}
              setBoard={setBoard}
              board={board}
            />
            <EditButton boardID={list.id} callback={setEditing} />
            <Droppable droppableId={list.id} type={'item'}>
              {(provided) => (
                <div
                  className='listContainer'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className='listItemsCont'>
                    {list['listItems'] &&
                      list['listItems'].map((item, i) =>
                        item.board.id === editing ? (
                          <div className='listItem addBoardForm'>
                            <AddBoardForm
                              parent={list.id}
                              placeholder={'Change Board Name'}
                              edit={true}
                              boardID={item.board.id}
                              setEditing={setEditing}
                              initValue={item.board.name}
                              index={item.index}
                              setBoard={setBoard}
                              board={board}
                            />
                          </div>
                        ) : (
                          <ListItem
                            key={item.board.id}
                            item={item.board}
                            container={item}
                            parentID={list.id}
                            setActiveBoard={setActiveBoard}
                            addMiddleBoard={addMiddleBoard}
                            setEditing={setEditing}
                            index={i}
                            list={list}
                            board={board}
                            setBoard={setBoard}
                          />
                        )
                      )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
            <div className='listItem addBoardForm'>
              <AddBoardForm
                parent={list.id}
                placeholder={'Add List Item'}
                index={
                  list.listItems.length
                    ? list.listItems[list.listItems.length - 1].index + 1
                    : 0
                }
                setBoard={setBoard}
                board={board}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
