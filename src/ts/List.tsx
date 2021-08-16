import React, { FC } from 'react';

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
};

const List: FC<ListProps> = ({
  list,
  boardFetch,
  client,
  parent,
  addHistory,
}) => {
  const [editing, setEditing] = React.useState('');

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
    <div
      className='list clickable'
      onClick={(e) => {
        addHistory();
        getBoard(e, list.id);
      }}
    >
      <h5 className='listTitle'>{list['name']}</h5>
      <DeleteButton
        boardID={list.id}
        client={client}
        callback={refreshTopBoard}
      />
      <EditButton client={client} boardID={list.id} callback={() => {}} />
      <div className='listContainer'>
        {list['listItems'] &&
          list['listItems'].map((item) =>
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
                getBoard={getBoard}
                client={client}
                refreshTopBoard={refreshTopBoard}
                addMiddleBoard={addMiddleBoard}
                setEditing={setEditing}
              />
            )
          )}
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
  );
};

export default List;
