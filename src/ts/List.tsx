import React, { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import ListItem from './ListItem';
import '../sass/styles.scss';
import AddBoardForm from './AddBoardForm';
import DeleteButton from './DeleteButton';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Boardtype } from './Interfaces';
import EditButton from './EditButton';

type ListProps = {
  boardFetch: Function;
  client: ApolloClient<NormalizedCacheObject>;
  parent: string;
  addHistory: Function;
  list: Boardtype;
  editing: string;
  setEditing: Function;
};

const List: FC<ListProps> = ({
  list,
  boardFetch,
  client,
  parent,
  addHistory,
  editing,
  setEditing,
}) => {
  const getBoard = (e: React.MouseEvent<HTMLElement>, id: string): void => {
    e.stopPropagation();
    boardFetch(id);
  };

  const refreshTopBoard = (e: React.MouseEvent<HTMLElement>) => {
    getBoard(e, parent);
  };

  const addMiddleBoard = () => {
    addHistory(list);
  };

  return (
    <Droppable droppableId={list.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className='list'
        >
          <h5
            onClick={(e) => {
              addHistory();
              getBoard(e, list.id);
            }}
            className='listTitle clickable'
          >
            {list['name']}
          </h5>
          <DeleteButton
            boardID={list.id}
            parentID={parent}
            client={client}
            callback={refreshTopBoard}
          />
          <EditButton boardID={list.id} callback={setEditing} />
          <div className='listContainer'>
            {list['listItems'] &&
              list['listItems'].map((item, i) =>
                item.id === editing ? (
                  <div className='listItem addBoardForm'>
                    <AddBoardForm
                      parent={list.id}
                      placeholder={'Change Board Name'}
                      client={client}
                      callback={refreshTopBoard}
                      edit={true}
                      boardID={item.id}
                      setEditing={setEditing}
                      initValue={item.name}
                    />
                  </div>
                ) : (
                  <ListItem
                    key={item['name']}
                    item={item}
                    parentID={list.id}
                    getBoard={getBoard}
                    client={client}
                    refreshTopBoard={refreshTopBoard}
                    addMiddleBoard={addMiddleBoard}
                    setEditing={setEditing}
                    index={i}
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
              callback={refreshTopBoard}
            />
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default List;
