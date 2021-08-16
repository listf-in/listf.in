import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import React, { FC } from 'react';
import '../sass/styles.scss';

type DeleteButtonProps = {
  boardID: string;
  callback: Function;
  client: ApolloClient<NormalizedCacheObject>;
};

const DeleteButton: FC<DeleteButtonProps> = ({ boardID, client, callback }) => {
  const deleteFromParentBoard = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    boardID: string
  ) => {
    e.stopPropagation();
    client
      .mutate({
        mutation: gql`mutation{
          deleteBoard(filter: {
            id: "${boardID}"
          }) {
            board {
              name
              id
            }
          }
        }
        `,
      })
      .then(() => {
        callback(e);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <i
      className='fas fa-window-close shareButtons deleteButton clickable'
      onClick={(e) => deleteFromParentBoard(e, boardID)}
    ></i>
  );
};

export default DeleteButton;
