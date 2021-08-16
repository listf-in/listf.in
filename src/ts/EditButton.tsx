import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import React, { FC } from 'react';
import '../sass/styles.scss';

type EditButtonProps = {
  boardID: string;
  callback: Function;
  client: ApolloClient<NormalizedCacheObject>;
};

const EditButton: FC<EditButtonProps> = ({ boardID, client, callback }) => {
  const editBoardFormer = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    callback(boardID);
  };

  return (
    <button
      className={'editButton clickable'}
      onClick={(e) => editBoardFormer(e)}
    >
      E
    </button>
  );
};

export default EditButton;
