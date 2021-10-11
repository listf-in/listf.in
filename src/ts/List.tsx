import React, { FC } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import ListItem from './ListItem';
import '../sass/styles.scss';
import AddBoardForm from './AddBoardForm';
import DeleteButton from './DeleteButton';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Boardtype, Ordertype } from './Interfaces';
import EditButton from './EditButton';

type ListProps = {
  setActiveBoard: Function;
  client: ApolloClient<NormalizedCacheObject>;
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
  client,
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
        >
          <Droppable droppableId={list.id} type={'item'}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='list'
              >
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
                  client={client}
                  container={container}
                />
                <EditButton boardID={list.id} callback={setEditing} />
                <div className='listContainer'>
                  {list['listItems'] &&
                    list['listItems'].map((item, i) =>
                      item.board.id === editing ? (
                        <div className='listItem addBoardForm'>
                          <AddBoardForm
                            parent={list.id}
                            placeholder={'Change Board Name'}
                            client={client}
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
                          client={client}
                          addMiddleBoard={addMiddleBoard}
                          setEditing={setEditing}
                          index={i}
                          list={list}
                        />
                      )
                    )}
                  {provided.placeholder}
                </div>
                <div className='listItem addBoardForm'>
                  <AddBoardForm
                    parent={list.id}
                    placeholder={'Add List Item'}
                    client={client}
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
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
