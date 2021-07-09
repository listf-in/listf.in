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

const List: FC<ListProps> = ({ list, boardFetch, client, parent }) => {
  const getBoard = (e: React.MouseEvent<HTMLElement>, id: string): void => {
    e.stopPropagation();
    boardFetch(id);
  };

  const refreshTopBoard = (e: React.MouseEvent<HTMLElement>) => {
    getBoard(e, parent);
  };

  return (
    <div className='list' onClick={(e) => getBoard(e, list.id)}>
      {list['name']}
      <DeleteButton
        boardID={list.id}
        client={client}
        callback={refreshTopBoard}
      />
      {list['listItems'] &&
        list['listItems'].map((item) => {
          return (
            <ListItem
              key={item['name']}
              item={item}
              getBoard={getBoard}
              client={client}
              refreshTopBoard={refreshTopBoard}
            />
          );
        })}
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
