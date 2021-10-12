import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import React, { FC } from 'react';
import '../sass/styles.scss';
import { Boardtype, Ordertype } from './Interfaces';

type DeleteButtonProps = {
  parentID: string;
  container: Ordertype;
  client: ApolloClient<NormalizedCacheObject>;
  setBoard: Function;
  board: Boardtype;
};

const DeleteButton: FC<DeleteButtonProps> = ({
  parentID,
  client,
  container,
  setBoard,
  board,
}) => {
  const optDelete = () => {
    if (parentID === board.id) {
      board.listItems.forEach((item, i) => {
        if (item.id === container.id) {
          board.listItems.splice(i, 1);
        }
        setBoard({ ...board });
      });
    } else {
      board.listItems.forEach((item, i) => {
        if (item.board.id === parentID) {
          board.listItems[i].board.listItems.forEach((item, j) => {
            if (item.id === container.id) {
              board.listItems[i].board.listItems.splice(j, 1);
            }
            setBoard({ ...board });
          });
        }
      });
    }
  };

  const deleteFromParentBoard = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    optDelete();
    client
      .mutate({
        mutation: gql`mutation{
          updateBoard(input: {
           filter: {
              id: "${parentID}"
            },
            remove: {
              listItems: {
                id: "${container.id}"
              }
            }

        }){
            board {
              id
              name
            }
          }
        }
        `,
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <i
      className='fas fa-window-close shareButtons deleteButton clickable'
      onClick={(e) => deleteFromParentBoard(e)}
    ></i>
  );
};

export default DeleteButton;
