import React, { FC } from 'react';
// import axios from 'axios';

import ListItem from './ListItem';
import '../sass/styles.scss';
import AddBoardForm from './AddBoardForm';

type ListProps = {
  boardFetch: Function;
  client: any;
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

  return (
    <div className='list' onClick={(e) => getBoard(e, list.id)}>
      {list['name']}
      {list['listItems'] &&
        list['listItems'].map((item) => {
          return (
            <ListItem key={item['name']} item={item} getBoard={getBoard} />
          );
        })}
      <div className='listItem addBoardForm'>
        <AddBoardForm
          parent={list.id}
          placeholder={'Add List Item'}
          client={client}
          callback={() => boardFetch(parent)}
        />
      </div>
    </div>
  );
};

export default List;
