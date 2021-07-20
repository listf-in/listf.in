import React, { FC } from 'react';

import ListItem from './ListItem';
import '../sass/styles.scss';
import AddBoardForm from './AddBoardForm';
import DeleteButton from './DeleteButton';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

type ListProps = {
  boardFetch: Function;
  client: ApolloClient<NormalizedCacheObject>;
  parent: string;
  addHistory: Function;
  list: {
    id: string;
    name: string;
    owner?: {
      id: string;
      name: string;
    };
    listItems?: {
      id: string;
      name: string;
      owner?: {
        id: string;
        name: string;
      };
      listItems?: {
        id: string;
        name: string;
        owner?: {
          id: string;
          name: string;
        };
      }[];
    }[];
  };
};

const List: FC<ListProps> = ({
  list,
  boardFetch,
  client,
  parent,
  addHistory,
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
    <div
      className='list clickable'
      onClick={(e) => {
        addHistory();
        getBoard(e, list.id);
      }}
    >
      {/* <div className={'listContainerContainer'}> */}
      {list['name']}
      <DeleteButton
        boardID={list.id}
        client={client}
        callback={refreshTopBoard}
      />
      <div className='listContainer'>
        {list['listItems'] &&
          list['listItems'].map((item) => {
            return (
              <ListItem
                key={item['name']}
                item={item}
                getBoard={getBoard}
                client={client}
                refreshTopBoard={refreshTopBoard}
                addMiddleBoard={addMiddleBoard}
              />
            );
          })}
      </div>
      <div className='listItem addBoardForm'>
        <AddBoardForm
          parent={list.id}
          placeholder={'Add List Item'}
          client={client}
          callback={refreshTopBoard}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default List;
